const symbols = [
    { content: 'AC', option: 'ALL_CLEAN', type: 'manager' },
    { content: 'C', option: 'CLEAN', type: 'manager' },
    { content: '&#8592;', option: 'DELETE', type: 'manager' },
    { content: '&#247;', option: 'DEVIDE', type: 'symbol' },

    { content: '7', option: 'NUMBER', type: 'number' },
    { content: '8', option: 'NUMBER', type: 'number' },
    { content: '9', option: 'NUMBER', type: 'number' },
    { content: '&#215;', option: 'TIMES', type: 'symbol' },

    { content: '4', option: 'NUMBER', type: 'number' },
    { content: '5', option: 'NUMBER', type: 'number' },
    { content: '6', option: 'NUMBER', type: 'number' },
    { content: '&#8722;', option: 'MINUS', type: 'symbol' },

    { content: '1', option: 'NUMBER', type: 'number' },
    { content: '2', option: 'NUMBER', type: 'number' },
    { content: '3', option: 'NUMBER', type: 'number' },
    { content: '+', option: 'PLUS', type: 'symbol' },

    { content: '0', option: 'NUMBER', type: 'number' },
    { content: '.', option: 'NUMBER', type: 'number' },
    { content: '=', option: 'EQUAL', type: 'symbol' },
]


const mainObj = {
    symbols,
    currentState: 'empty',
    firstNum: null,
    currentAction: null,
    secondNum: null,
    result: null,
    nodes: {
        firstNum: null,
        currentSymbol: null,
        secondNum: null,
        result: null,
    },
    getButtonClassName(type) {
        switch (type) {
            case 'manager':
                return 'grey_btn'
            case 'symbol':
                return 'orange_btn'
            default:
                return 'white_btn'
        }
    },
    createButtons(container) {
        this.symbols.forEach(item => {
            this.createButton(item, container)
        })
    },
    createButton({ content, option, type }, container) {
        const btn = document.createElement('button')
        const span = document.createElement('span')
        btn.className = this.getButtonClassName(type) + ((content === '0') ? ' zero_btn' : "")
        btn.onclick = () => this.getButtonClickFunc(content, option, type)
        span.innerHTML = content
        btn.append(span)
        container.append(btn)
    },
    createMonitor(container) {
        const num1 = document.createElement('p')
        this.nodes.firstNum = num1
        const symbol = document.createElement('p')
        this.nodes.currentSymbol = symbol
        const num2 = document.createElement('p')
        this.nodes.secondNum = num2
        const result = document.createElement('p')
        this.nodes.result = result
        const monitor = document.createElement('div')
        monitor.className = 'calcMonitor'
        monitor.append(num1, symbol, num2, result)
        container.append(monitor)
    },
    addNumber(num) {
        console.log(this.currentAction)
        const currentNum = this.currentAction ? 'secondNum' : 'firstNum'

        if (num === '.') {
            if (this[currentNum].includes('.') || !this[currentNum]) return "can't add dot"
        }

        if (this[currentNum]) this[currentNum] += num
        else this[currentNum] = num
        this.nodes[currentNum].innerText = this[currentNum]
    },
    setSymbol(content, option) {
        if (this.currentAction && this.secondNum) {
            const result = this.calculateResult()
            this.clearAll()
            this.addNumber(result)
        }
        if (option != 'EQUAL') {
            this.nodes.currentSymbol.innerHTML = content
            this.currentAction = option
        }
    },
    clearAll() {
        this.firstNum = null
        this.currentAction = null
        this.secondNum = null
        this.result = null
        for (key in this.nodes) {
            this.nodes[key].innerText = ''
        }
    },
    clearSecondNum() {
        this.secondNum = null
        this.nodes.secondNum.innerText = ''
    },
    deleteLastLatter() {
        const currentNum = this.currentAction ? 'secondNum' : 'firstNum'
        this[currentNum] = this[currentNum].slice(0, -1)
        this.nodes[currentNum].innerText = this[currentNum]
    },
    manageValues(option) {
        switch (option) {
            case 'ALL_CLEAN':
                return this.clearAll()
            case 'CLEAN':
                return this.clearSecondNum()
            case 'DELETE':
                return this.deleteLastLatter()
        }
    },
    calculateResult() {
        switch (this.currentAction) {
            case 'DEVIDE':
                this.result = +this.firstNum / +this.secondNum
                break;
            case 'TIMES':
                this.result = +this.firstNum * +this.secondNum
                break;
            case 'PLUS':
                this.result = +this.firstNum + +this.secondNum
                break;
            case 'MINUS':
                this.result = +this.firstNum - +this.secondNum
                break;
            default:
                return "can't calculate result"

        }
        this.nodes.result.innerText = this.result
        return this.result
    },
    getButtonClickFunc(content, option, type) {
        if (type === 'number') {
            this.addNumber(content)
            if (this.secondNum) this.calculateResult()
        }
        else if (type === 'symbol' && this.firstNum) this.setSymbol(content, option)
        else if (type === 'manager') this.manageValues(option)
    },
    keydownFunc(e) {
        if (isFinite(e.key) || e.key === '.') {
            return this.getButtonClickFunc(e.key, 'NUMBER', 'number')
        }
        switch (e.key) {
            case '/':
                return this.getButtonClickFunc(e.key, 'DEVIDE', 'symbol')
            case '*':
                return this.getButtonClickFunc(e.key, 'TIMES', 'symbol')
            case '+':
                return this.getButtonClickFunc(e.key, 'PLUS', 'symbol')
            case '-':
                return this.getButtonClickFunc(e.key, 'MINUS', 'symbol')
            case '=':
                return this.getButtonClickFunc(e.key, 'EQUAL', 'symbol')
            case 'Enter':
                return this.getButtonClickFunc(e.key, 'EQUAL', 'symbol')
            case 'Backspace':
                return this.getButtonClickFunc(e.key, 'DELETE', 'manager')
        }
    },
    initApp() {
        const mainCont = document.querySelector(`#calc`)

        this.createMonitor(mainCont)

        const btnsWrapper = document.createElement('div')
        btnsWrapper.className = 'btns_wrapper'

        this.createButtons(btnsWrapper)

        mainCont.append(btnsWrapper)

        document.addEventListener('keydown', this.keydownFunc.bind(this))
    },
}


mainObj.initApp()


