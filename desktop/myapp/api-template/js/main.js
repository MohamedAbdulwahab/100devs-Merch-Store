//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  console.log(choice)

  const url = `https://api.nasa.gov/planetary/apod?api_key=w2SDLavSaebhYrM02qjOzSYmaWxmTA32Srr3h8g0&date=${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        if(data.media_type === 'image'){
          document.querySelector('img').src = data.hdurl
        }else if(data.media_type === 'video'){
          document.querySelector('iframe').style.display = 'block'
          document.querySelector('iframe').src = data.url
          document.querySelector('img').style.display = 'none'
        }
        
        document.querySelector('h3').innerText = data.explanation
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

