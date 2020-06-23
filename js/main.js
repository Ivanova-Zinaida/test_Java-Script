// вводим массив с данными
let invoices = [
    {
        "customer":"MDT",
        "performance": [
            {
                "playID": "Гамлет",
                "audience": 55,
                "type": "tragedy"
            },
            {
                "playID": "Ромео и Джульета",
                "audience": 35,
                "type": "tragedy"
            },
            {
                "playID": "Отелло",
                "audience": 40,
                "type": "comedy"
            },
        ]
    },
    {
        "customer":"театр Музыкальных комедий",
        "performance": [
            {
                "playID": "Гамлет",
                "audience": 55,
                "type": "tragedy"
            },
            {
                "playID": "Ромео и Джульета",
                "audience": 35,
                "type": "tragedy"
            },
            {
                "playID": "Отелло",
                "audience": 40,
                "type": "comedy"
            },
            {
                "playID": "Отелло",
                "audience": 40,
                "type": "comedy"
            },
        ]
    }

] // нехватала закрывающей скобки

function statement(invoices, plays) {
    const format = new Intl.NumberFormat("ru-Ru", {
    style: "currency", currency: "RUB", minimumFranctionDigits: 2}).format; // ошибка в написание Inti вместо Intl 
    let totalAmount = 0;
    let volumeCredits = 0;
    
    let invoice = []
    
    // добавляем проверку для того что бы найти необходимого клиента
    for(let invo of invoices){
        if(invo.customer == plays){
            invoice = invo
        }
    };
    
    let result = `Cчет для ${invoice.customer}\n`;
    
    for(let perf of invoice.performance){
        // переменная для подсчета количеств комедий
        let numberComedy = 0;
        let thisAmount = 0;
        
        let play = perf.playID;
        let type = perf.type;
        let audience = perf.audience;
        
        switch (type) {
            case "tragedy":
                thisAmount = 40000;
                
                if (audience > 30 ) {
                    thisAmount += 1000 * (audience - 30 );
                }
                break;
            case "comedy":
                numberComedy += 1;
                thisAmount = 30000;
                if (audience > 30 ) {
                    thisAmount += 10000 + 500 * (audience - 20 );
                }
                thisAmount += 300 * audience;
                break;
            default:
                throw new Error('неизвестный тип: ${play.type}');
            
        };
            // Добавляет бонусы
        
            volumeCredits += Math.max((audience - 30), 0);
            
            // Добавляет бонус за каждые 10 комедий
           // внесли проверка на количество дополнительных бонусов 
            if ("comedy" === type && numberComedy == 10)  {
                volumeCredits += Math.floor(audience / 5);
                console.log(audience);
                
                numberComedy = 0;
            }
       
            result += ` ${play}: ${format(thisAmount / 100)}\n`;
            result += ` ${perf.audience} мест\n`;
            totalAmount += thisAmount;

            
    } 
    result += `Общее количество бонусов: ${volumeCredits} \n`
    result += `Итого с вас ${format(totalAmount / 100)}`
    return result;
}

console.log(statement(invoices, 'MDT'))
console.log(statement(invoices, 'театр Музыкальных комедий'))

