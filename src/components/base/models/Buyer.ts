// import type { TPayment } from '../../../types/index.ts';
import { IBuyer } from '../../../types/index.ts';

export class Buyer {
    private Buyer: IBuyer | null;
    // constructor(Buyer?: IBuyer) {
        // this.Buyer = Buyer ?? null;
    // } 
    constructor (Buyer: IBuyer) {
        this.Buyer = Buyer;
    }
    saveBuyerData<key extends keyof IBuyer>(key: key, value: IBuyer[key]): void {
        if(!this.Buyer) {
            this.Buyer = {} as IBuyer;
        }
        this.Buyer[key] = value;
    }
    getBuyerData(): IBuyer | null {
        if (this.Buyer) {
            return this.Buyer as IBuyer;
        }
        return null;
    }
    clearBuyerData(): void {
        this.Buyer = null;
    }
    // Поле является валидным, если оно не пустое. 
    // Подсказка: Как один из вариантов решения задачи валидации может быть метод,
    // который вернет объект. В объекте могут присутствовать поля, 
    // соответствующие полям класса, значениями у которых будет текст ошибки. 
    // Если же поле не содержит ошибок, то такое свойство в объекте может отсутствовать.
    //       {
    //       payment: 'Не выбран вид оплаты',
    //       email: 'Укажите емэйл',
    //       } 
    //       Такой объект будет сообщать о валидности полей с телефоном и адресом и наличии 
    // ошибок в полях с видом оплаты и емэйлом. Можно сделать и отдельные методы для каждого 
    // поля, выбор за вами.
    //   Метод валидации должен давать возможность определить не только валидность
    //  каждого отдельного поля, но и предоставлять информацию об ошибке, 
    // связанной с проверкой конкретного значения     
    // validBuyerData(): boolean {

    // }
}