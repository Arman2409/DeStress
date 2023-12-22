
const getVh = (percent: number) => {
    var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * height) / 100;
}

export default getVh;