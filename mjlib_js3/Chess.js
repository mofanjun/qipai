/**
 * Created by litengfei on 2018/3/8.
 */
var Chess = {}
var Majiang = {};
Majiang.cards = [
    11,12,13,14,15,16,17,18,19,//万
    21,22,23,24,25,26,27,28,29,//条
    31,32,33,34,35,36,37,38,39,//筒
    41,42,43,44,45,46,47,//分 东南西北白中发

    61,62,63,64,65,66,67,68,69,//万
    71,72,73,74,75,76,77,78,79,//条
    81,82,83,84,85,86,87,88,89,//筒
    91,92,93,94,95,96,97,//东南西北白中发

    111,112,113,114,115,116,117,118,119,//万
    121,122,123,124,125,126,127,128,129,//条
    131,132,133,134,135,136,137,138,139,//筒
    141,142,143,144,145,146,147,//东南西北白中发

    161,162,163,164,165,166,167,168,169,//万
    171,172,173,174,175,176,177,178,179,//条
    181,182,183,184,185,186,187,188,189,//筒
    191,192,193,194,195,196,197,//东南西北白中发
];

Majiang.card = function (cdIdx) {
    var sCdIdx = this.smCard(cdIdx);
    var ca = new Array(2);ca[0] = parseInt(sCdIdx/10); ca[1] = sCdIdx%10;
    return ca;
}

Majiang.smCard = function (cdIdx) {//在一副牌里面的牌
    if(cdIdx>=60)return this.smCard(cdIdx - 50);
    return cdIdx;
}

Majiang.tIndex = function (cardIndex) {//在34张牌里的索引
    var card = this.card(cardIndex);
    return (card[0]-1)*9+(card[1]-1);
}

Chess.Majiang = Majiang;
window.Chess = Chess;


