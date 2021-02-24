import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

async function saveItem(listItem, id) {
    listItem.id = id ? id : new Date().getTime()
    const savedItems = await getItems();

    if (id) {
        const index = await savedItems.findIndex(item => item.id === id);
        savedItems[index] = listItem;
    }
    else
        savedItems.push(listItem);

    // const gasto = {
    //     username: 55,
    //     date: "2021-01-14"
    // }

    // console.log(gasto);

    // axios.post('http://172.18.9.221:5000/gastos/add', gasto)
    //     .then(res => console.log(res.data));


    return AsyncStorage.setItem('items', JSON.stringify(savedItems));
}

function getItems() {
    return AsyncStorage.getItem('items')
        .then(response => {
            if (response)
                return Promise.resolve(JSON.parse(response));
            else
                return Promise.resolve([]);
        })
}

async function getItem(id) {
    const savedItems = await getItems();
    return savedItems.find(item => item.id === id);
}

async function deleteItem(id) {
    let savedItems = await getItems();
    const index = await savedItems.findIndex(item => item.id === id);
    savedItems.splice(index, 1);
    return AsyncStorage.setItem('items', JSON.stringify(savedItems));
}

module.exports = {
    saveItem,
    getItems,
    getItem,
    deleteItem
}
