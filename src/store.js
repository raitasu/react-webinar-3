/**
 * Хранилище состояния приложения
 */


class Store {
    constructor(initState = {}) {
        this.state = initState;
        this.listeners = []; // Слушатели изменений состояния
    }

    /**
     * Подписка слушателя на изменения состояния
     * @param listener {Function}
     * @returns {Function} Функция отписки
     */
    subscribe(listener) {
        this.listeners.push(listener);
        // Возвращается функция для удаления добавленного слушателя
        return () => {
            this.listeners = this.listeners.filter(item => item !== listener);
        }
    }

    /**
     * Выбор состояния
     * @returns {Object}
     */
    getState() {
        return this.state;
    }

    /**
     * Установка состояния
     * @param newState {Object}
     */
    setState(newState) {
        this.state = newState;
        // Вызываем всех слушателей
        for (const listener of this.listeners) listener();
    }

    /**
     * Добавление новой записи
     */

    addItem() {
        const {list} = this.state;
        let code = 0;
        if (list.length > 0) code = Math.max(...list.map((item) => item.code));
        this.setState({
            ...this.state,
            list: [...this.state.list, {code: code + 1, title: 'Новая запись', isSelect: false, countOfSelections: 0}]
        })
    };

    /**
     * Удаление записи по коду
     * @param code
     */
    deleteItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.filter(item => item.code !== code)
        });
    };

    /**
     * Выделение записи по коду
     * @param code
     */
    selectItem(code) {

        this.setState({
            ...this.state,
            list: this.state.list.map(item => {
                if (item.code === code) {
                    return {
                        ...item,
                        isSelect: !item.isSelect,
                        countOfSelections: item.isSelect ? item.countOfSelections : item.countOfSelections + 1
                    };
                } else {
                    return {...item, isSelect: false};
                }
            })
        });
    }
}

export default Store;
