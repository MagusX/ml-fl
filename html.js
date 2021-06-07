module.exports = {
    loadingPage: () => (`<div id="loading">Loading...</div>`),
    resultPage: resData => (`
    <div>
        <script type="text/javascript"> document.getElementById("loading").setAttribute("hidden", true)</script>
        <div>Result:</div>
        <img src="./response/predictions.jpg">
        <div>${resData}</div>
        <div>
        <input type="submit" value="Detect another picture" onclick="window.location='/';" />
        </div>
    </div>`)
}