let Punchline = '';

    async function getJoke() {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/jokes/random'); 
      const json = await response.json();
      if(!response.ok) {
        throw Error(response.statusText);
      }

      document.querySelector('#setup').textContent = json.setup; 
      Punchline = json.punchline; 

      document.querySelector('#punchline').textContent = '';
      document.querySelector('#punchline').style.display = 'none';
      document.querySelector('#answerBtn').disabled = false;

    } catch(err) {
        console.log(err);
        alert("Fail");
    }
      
}

    function showAnswer() {
      document.querySelector('#punchline').textContent = Punchline; 
      document.querySelector('#punchline').style.display = 'block'; 
      document.querySelector('#answerBtn').disabled = true; 

    }