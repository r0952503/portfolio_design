let head = 0;
let coin = document.querySelector('.coin');
let flip = document.querySelector('.flip-coin');

console.log(coin, flip);

flip.addEventListener('click', function() {
    coin.style.animation = 'none';
    setTimeout(function() {
        coin.style.animation = "spin-tails 1s forwards";
        head++;
        stats();
    },50);
});

function stats(){
    let headScoreElement = document.getElementById("head");
    headScoreElement.textContent = `Heads: ${head}`;
};
