class Game{
    compDict = ['apple', 'ball', 'circle', 'dog', 'egg', 'fail', 'ground', 'home', 'image', 'join', 'key', 'location', 'message', 'name', 'other', 'player', 'quick', 'room', 'status', 'time', 'user', 'video', 'window', 'xerox', 'yourself', 'zone']
    personDict = []
    usedWords = []
    humanpoint = 0;
    machinepoint= 0;
    computerCount = 0;

    spchRec(){
        let personWord
        voice.start();
        voice.onaudiostart = () => {
            console.log('started..')
        }
        
        voice.onaudioend = () => {
            console.log('ended..')
        }

        voice.onerror = event => {
            personWord = 'Speech recognition error detected: ' + event.error
            this.setPersonWord(personWord)
        }
        
        voice.onresult = event => {
            personWord = event.results[0][0].transcript
            console.log(event.results[0][0].transcript);
            this.setPersonWord(personWord) 
        }
    }

    setPersonWord(word){
        if(
            word[0] == words.textContent[words.textContent.length - 1] &&
            this.computerCount > 0 &&
            !this.personDict.includes(word) &&
            !this.usedWords.includes(word)
            ){
            sozlar.textContent = 'You: ' + word
            this.personDict.push(word)
            console.log(this.personDict);
            this.setComputerWord(word[word.length-1])
        }
        else if(
            (word.split(' ').length == 1 && !this.computerCount > 0))
            //  || 
            // ((this.humanpoint > 0 && !this.personDict.includes(word) && !this.usedWords.includes(word)) || 
            // (this.machinepoint > 0 && !this.personDict.includes(word) && !this.usedWords.includes(word))))
        {
            sozlar.textContent = 'You: ' + word
            this.personDict.push(word)
            console.log(this.personDict);
            this.setComputerWord(word[word.length-1])
        }
        else if(word.split(' ').length > 1){
            sozlar.textContent = word
        }
        else{
            this.machinepoint++
            sozlar.textContent = 'You: ' + word
            
            setTimeout(() => {
                if(confirm("You lose! Your word does not start with the last latter of computer's word. Do you want to continue?")){
                    this.compDict = [...new Set([...this.personDict, ...this.compDict, ...this.usedWords])];
                    this.personDict = []
                    this.usedWords = []
                    this.computerCount = 0
                    computerPoint.textContent = 'Computer: ' + this.machinepoint
                    words.textContent = 'Computer: '
                    sozlar.textContent = 'You: '
                    console.log(this.compDict);
                }
                else{
                    let body = document.querySelector('.body')
                    body.innerHTML = ''
                    let gameover = document.createElement('h2')
                    gameover.textContent = 'Game over'
                    body.append(gameover)
                }
            }, 500);
            
        }
    }

    setComputerWord(letter){
        let count = 0;
        this.computerCount++
        setTimeout(() => {
            for(let i of this.compDict){
                if(i[0] != letter){
                    count++
                }else if(i[0] == letter && !this.personDict.includes(i)){
                    words.textContent = 'Computer: ' + i
                    this.usedWords.push(this.compDict.splice(this.compDict.indexOf(i), 1) + '')
                    console.log(this.usedWords);
                    break;
                }else{
                    this.computerLose(letter)
                }   
            }
            if(count == this.compDict.length){
                this.computerLose(letter)
            }
        }, 500);

    }

    computerLose(letter){
        this.humanpoint++
        words.textContent = 'Computer: ' + `I don't know any word begins with ${letter}`
        setTimeout(() => {
           if(confirm("Congratulations, you win!!! Do you want to continue?")){
                this.compDict = [...new Set([...this.personDict, ...this.compDict, ...this.usedWords])];
                this.personDict = []
                this.usedWords = []
                this.computerCount = 0
                personPoint.textContent = 'Person: ' + this.humanpoint
                words.textContent = 'Computer: '
                sozlar.textContent = 'You: '
                console.log(this.compDict);
           }else{
                let body = document.querySelector('.body')
                body.innerHTML = ''
                let gameover = document.createElement('h2')
                gameover.textContent = 'Game over'
                body.append(gameover)
           }
        }, 500);
    }
}


let startGame = new Game()
const voice = new webkitSpeechRecognition()
let btn = document.querySelector('.btn')
let speakbtn = document.querySelector('.speakclass');
let personPoint = document.querySelector('.ppoint')
let computerPoint = document.querySelector('.cpoint')
let words = document.querySelector('.comWord')
let sozlar = document.querySelector('.perWord')


voice.lang = 'en-EN'

btn.addEventListener('click', (event) => {
    console.log(event.target.textContent);
    setTimeout(() => {
        event.target.style.display = 'none';
        speakbtn.style.display = 'flex';
    }, 300);
    
})
speakbtn.onclick = () => {
    startGame.spchRec()
}