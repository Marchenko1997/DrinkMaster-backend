const fullYearsCount = async (data) => {
    const dataNow = new Date();
    const dataBirth = Date.parse(data);
    const fullYears = await Math.floor((dataNow - dataBirth) / 3.156e10);
    return fullYears;
};

export default fullYearsCount;
