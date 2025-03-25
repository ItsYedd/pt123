import moment from 'moment'
const formatDate = (timeObj) => {
    const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
    let day = days[timeObj.getDay()]
    let date = `${timeObj.getDate()}/${timeObj.getMonth() + 1}/${timeObj.getFullYear()}`
    let time = `${timeObj.getHours()}:${timeObj.getMinutes()}`
    return `${day}, ${time} ${date}`
    
}
const generateDate = () => {
    let gapExpire = Math.floor(Math.random() * 29) + 1
    let today = new Date()
    let expireDay = moment(today).add(gapExpire, 'd').toDate()
    return {
        today: formatDate(today),
        expireDay : formatDate(expireDay)
    }
}

export default generateDate
