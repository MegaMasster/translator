const sendBtn = document.querySelector(".translate-box__active-Btn")
const resultInput = document.querySelector(".input_en")
const enterInput = document.querySelector(".input_ru")
const manySymError = document.querySelector(".manySymError")


async function translate(sentWord) {

    const fromLang = "ru"
    const toLang = "en"
    const encodedText = encodeURIComponent(sentWord)
    const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${fromLang}|${toLang}`;

    try{

        const response = await fetch(`${url}`)

        if(!response.ok){
            throw new Error(`Server error: ${response.status}`)
        } 

        const data = await response.json()
        console.log(data)

        const translatedText = data.responseData.translatedText
        if(data.responseDetails == "QUERY LENGTH LIMIT EXCEEDED. MAX ALLOWED QUERY : 500 CHARS"){
            resultInput.value = ""
            enterInput.value = ""
            manySymError.innerHTML = "QUERY LENGTH LIMIT EXCEEDED. MAX ALLOWED QUERY : 500 CHARS"
        }else if(data.responseStatus == "403"){
            enterInput.focus()
            manySymError.innerHTML = ""
        }else{
            resultInput.innerHTML = translatedText 
            manySymError.innerHTML = ""
        }

    }catch(error){
        console.error(error)
    }

}


sendBtn.addEventListener("click" , () => {
    const sentWord = document.querySelector(".input_ru").value
    translate(sentWord)
})