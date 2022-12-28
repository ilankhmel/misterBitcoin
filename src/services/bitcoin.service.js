import axios from "axios";
import { storageService } from "./storage.service";

export const bitcoinService = {
    getRate,
    getMarketPrice,
    getConfirmedTransactions,
}


async function getRate(){
    var rate = storageService.load('rate')
    if(!rate){
        rate = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
        storageService.store('rate', rate.data)
        return rate.data
    }
    
    return rate
}

async function getMarketPrice(){
    var marketPrice = storageService.load('marketPrice')
    if(!marketPrice){
        marketPrice = await axios.get('https://api.blockchain.info/charts/trade-volume?timespan=1months&format=json&cors=true')
        storageService.store('marketPrice', marketPrice.data)
        return marketPrice.data

    }
    return marketPrice
}

async function getConfirmedTransactions(){
    var confirmedTransactions =  storageService.load('confirmedTransactions')

    if(!confirmedTransactions){
        confirmedTransactions = await axios.get('https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true')
        storageService.store('confirmedTransactions', confirmedTransactions.data)
        return confirmedTransactions.data
    }

    return confirmedTransactions
}