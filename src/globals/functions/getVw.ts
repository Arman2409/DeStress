const getVw = (percent: number) => {
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * width) / 100;
}

export default getVw;