function getDate(date) {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}

const proxy = 'https://cors-anywhere.herokuapp.com/'
$.getJSON(proxy + 'https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b6907d289e10d714a6e88b30761fae22').then((res) => {
  $('#cityName').val(res.city.name)
  var dateArray = [getDate(new Date(res.list[0].dt * 1000))]
  var maximumTemp = res.list[0].main.temp_max
  var totalHumidity = 0;
  var totalCounts = 0;
  for (let i = 0; i < res.list.length; i++) {
    const date = new Date(res.list[i].dt * 1000)
    const dateInString = getDate(date)
    // if (i == res.list.length - 1)
    if (dateArray.includes(dateInString)) {
      if (maximumTemp < res.list[i].main.temp_max)
        maximumTemp = res.list[i].main.temp_max
      totalHumidity += res.list[i].main.humidity
      totalCounts += 1
      var s = totalHumidity / totalCounts
    }
    else {
      $('#weatherTable').append(`<tr><td>${maximumTemp}</td><td>${(totalHumidity / totalCounts).toFixed(2)}</td><td>${getDate(new Date(res.list[i - 1].dt * 1000))}</td></tr>`)
      dateArray.push(dateInString)
      maximumTemp = res.list[i].main.temp_max
      totalCounts = 1
      totalHumidity = res.list[i].main.humidity
    }

    if (i == res.list.length - 1)
      $('#weatherTable').append(`<tr><td>${maximumTemp}</td><td>${(totalHumidity / totalCounts).toFixed(2)}</td><td>${getDate(new Date(res.list[i - 1].dt * 1000))}</td></tr>`)
    // debugger
  }
}).catch((e) => {
  console.log(e)
})