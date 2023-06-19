

const calcStore = {
    symbols: [
        'AC', 'C', '<', "/",
        '7', '8', '9', "*",
        '4', '5', '6', "-",
        '1', '2', '3', "+",
        '0', '.', "=",
    ],
    initialize(id) {
        const mainCont = document.querySelector(`#${id}`)

        // create monitor
        const calcMonitor = document.createElement('div')
        calcMonitor.className = 'monitor'
        const calcProcess = document.createElement('p')
        calcProcess.className = 'calc_process'
        const calcResult = document.createElement('p')
        calcResult.className = 'calc_result'
        calcMonitor.append(calcProcess, calcResult)
        mainCont.append(calcMonitor)

        // create btns
        const btnsWrapper = document.createElement('div')
        btnsWrapper.className = 'btns_wrapper'
        mainCont.append(btnsWrapper)
        for (item of this.symbols) {
            const button = document.createElement('button')
            const span = document.createElement('span')
            span.innerHTML = item

            button.append(span)
            btnsWrapper.append(button)

            let itemNum = this.symbols.indexOf(item) + 1
            if (itemNum <= 3) {
                button.className = 'grey_btn'
            } else if (itemNum % 4 === 0 || itemNum === '19') {
                button.className = 'orange_btn'
            } else {
                button.className = 'white_btn'
            }
        }

        // addEventListeners
        btnsWrapper.addEventListener('click', (e) => {
            // console.log(e.target.textContent)
            setUserValue(e.target.textContent)
        })
        
        document.addEventListener('keydown', (e) => {
            // console.log(e.key, e.code)
            setUserValue(e.key)
        })

        function setUserValue(userValue) {

            if (userValue === 'C') calcProcess.textContent = ''
            if (userValue === 'AC') {
                calcProcess.textContent = ''
                calcResult.textContent = ''
            }
        
            const isDelOne = ['Backspace', '<'].some(item => item === userValue)
            if (isDelOne) {
                calcProcess.textContent = calcProcess.textContent.slice(0, calcProcess.textContent.length - 1)
            }
        
            const isEqual = ['Enter', '='].some(item => item === userValue)
            if (isEqual) {
                calcResult.textContent = eval(calcProcess.textContent)
                calcProcess.textContent = ''
            }
        
            // const isSymbol = ['+', '-', '*', '/', '.'].some( item => item === userValue)
            const isPrintable = '+-*/.0123456789'.split('').some(item => item === userValue)
            if (isPrintable) {
                calcProcess.textContent += userValue
                calcResult.textContent = eval(calcProcess.textContent)
            }
        }
    },
}



calcStore.initialize('calc')
