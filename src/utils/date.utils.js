
const dateUtils = {
	format: function (d = new Date(), f = "yyyy/MM/dd HH:mm:ss") {
		// const timezone = Math.abs(d.getTimezoneOffset()) * 60 * 1000;
		// d = new Date(d.getTime() + timezone)
		const year = d.getFullYear();
	    const month = (d.getMonth() < 9) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
	    const day = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate();
	    const hour = (d.getHours() < 10) ? "0" + d.getHours()*1 : d.getHours();
	    const minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
	    const seconds = (d.getSeconds() < 10) ? "0" + d.getSeconds() : d.getSeconds();

	    return f.replace(/yyyy/g, year)
	            .replace(/MM/g, month)
	            .replace(/dd/g, day)
	            .replace(/HH/g, hour)
	            .replace(/mm/g, minutes)
	            .replace(/ss/g, seconds)
	}
}

module.exports = dateUtils