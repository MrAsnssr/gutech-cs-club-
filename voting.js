// Voting System

document.addEventListener('DOMContentLoaded', function() {
    loadVote();
});

async function loadVote() {
    try {
        if (typeof firebase === 'undefined' || !firebase.database) {
            return;
        }

        const voteRef = firebase.database().ref('vote');
        const snapshot = await voteRef.once('value');
        const voteData = snapshot.val();

        if (voteData && voteData.active) {
            document.getElementById('voting').style.display = 'block';
            document.getElementById('nav-vote').style.display = 'block';
            const currentUser = firebase.auth().currentUser;
            if (currentUser) {
                const userVoteRef = firebase.database().ref(`users/${currentUser.uid}/votes/${voteData.id}`);
                const userVoteSnapshot = await userVoteRef.once('value');

                if (!userVoteSnapshot.exists()) {
                    document.getElementById('votingQuestion').textContent = voteData.question;
                    const optionsHtml = voteData.options.map((option, index) => {
                        return `<div class="form-group">
                                    <input type="radio" name="voteOption" value="${index}" id="option${index}">
                                    <label for="option${index}">${option.name}</label>
                                </div>`;
                    }).join('');
                    document.getElementById('votingOptions').innerHTML = optionsHtml;
                } else {
                    showVoteResults();
                }
            }
        }
    } catch (error) {
        console.error('Error loading vote:', error);
    }
}

document.getElementById('castVoteBtn').addEventListener('click', async function() {
    const selectedOption = document.querySelector('input[name="voteOption"]:checked');
    if (selectedOption) {
        const voteId = (await firebase.database().ref('vote').once('value')).val().id;
        const optionIndex = selectedOption.value;
        const currentUser = firebase.auth().currentUser;

        if (currentUser) {
            const userVoteRef = firebase.database().ref(`users/${currentUser.uid}/votes/${voteId}`);
            await userVoteRef.set(true);

            const optionRef = firebase.database().ref(`vote/options/${optionIndex}/count`);
            await optionRef.transaction(function(currentCount) {
                return (currentCount || 0) + 1;
            });

            showVoteResults();
        }
    }
});

async function showVoteResults() {
    try {
        if (typeof firebase === 'undefined' || !firebase.database) {
            return;
        }

        const voteRef = firebase.database().ref('vote');
        const snapshot = await voteRef.once('value');
        const voteData = snapshot.val();

        if (voteData) {
            document.getElementById('votingQuestion').textContent = voteData.question;
            const totalVotes = voteData.options.reduce((total, option) => total + (option.count || 0), 0);
            const resultsHtml = voteData.options.map(option => {
                const percentage = totalVotes > 0 ? ((option.count || 0) / totalVotes) * 100 : 0;
                return `<div class="vote-result">
                            <div class="vote-option-name">${option.name}</div>
                            <div class="vote-bar-container">
                                <div class="vote-bar" style="width: ${percentage}%;"></div>
                            </div>
                            <div class="vote-percentage">${percentage.toFixed(1)}%</div>
                        </div>`;
            }).join('');
            document.getElementById('votingOptions').innerHTML = resultsHtml;
            document.getElementById('castVoteBtn').style.display = 'none';
        }
    } catch (error) {
        console.error('Error showing vote results:', error);
    }
}
