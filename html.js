module.exports = {
    detectorPage: () => (`
    <div class="align-middle mt-5 pt-5">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
        <div class="text-center align-middle" id="loading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <span><strong> Running detector...</strong></span>
        </div>
        <div id="result" hidden>
            <div class="card container-sm" style="width: 40rem;">
                <img id="resImg" src="" class="card-img-top img-fluid" alt="Predictions">
                <div class="card-body">
                    <h5 class="card-title">Results</h5>
                    <p class="card-text" id="resData"></p>
                    <input class="btn btn-primary" type="submit" value="Detect another picture" onclick="window.location='/';" />
                </div>
            </div>
        </div>
    </div>
    `),
    resultPage: resData => {
    let _resData = resData.split('../public/request/');
    _resData = _resData[1].split('\n');
    _tmp = _resData[0].split(': Predicted');
    _resData[0] = `${_tmp[0]}<br>Predicted${_tmp[1]}`;
    _resData = _resData.slice(0, _resData.length - 1).join('<br>');
    return `<div>
        <script type="text/javascript">document.getElementById("loading").setAttribute("hidden", true)</script>
        <script type="text/javascript">document.getElementById("result").removeAttribute("hidden")</script>
        <script type="text/javascript">document.getElementById("resData").innerHTML="${_resData}"</script>
        <script type="text/javascript">document.getElementById("resImg").src="./response/predictions.jpg"</script>
    </div>`;
    }
}