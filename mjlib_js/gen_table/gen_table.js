"use strict";

let mjlib = require( '../api.js' );

let gui_tested = {};
let gui_eye_tested = {};

let Gen = module.exports;

Gen.check_add = function( cards, gui_num, eye )  
{
    let key = 0;
    for( let i = 0; i < 9; i++ ) 
    {
        key = key * 10 + cards[ i ];
    }
    let m = false;
    if( !eye ) 
    {
        m = gui_tested[ gui_num ];
    } 
    else 
    {
        m = gui_eye_tested[ gui_num ];
    }
    let ok = m[ key ];
    if ( ok ) 
    {
        return false
    }
    m[ key ] = true;
    for(let i=0;i<9;i++){
        if(cards[i]>4){//TODO:4如何来的
            return true;
        } 
    }
    console.log("生成表===="+key);
    mjlib.MTableMgr.Add( key, gui_num, eye, true );
    return true;
};

//把成型的牌去掉某张后，存表。
Gen.parse_table_sub = function( cards, num, eye ) 
{

    for ( let i = 0; i < 9; i++ )
    {
        if ( cards[i] == 0 ) 
        {
             continue;
        }
        cards[i]--;
        if ( !this.check_add( cards, num, eye ) ) 
        {
            cards[i]++;
            continue;
        }
        if ( num < 8 ) 
        {
            this.parse_table_sub( cards, num+1, eye );
        }
        cards[ i ]++;
    }
};

Gen.parse_table = function( cards, eye ) 
{

    if ( !this.check_add( cards, 0, eye ) )
    {
        return;
    }
   this.parse_table_sub( cards, 1, eye );
};

Gen.gen_111_3 = function( cards, level, eye ) 
{
    for ( let i = 0; i < 16; i++ )//9个3，7个111
    {
        if(i<=8){
            if(cards[i]>3){
                continue;
            }
            cards[i]+=3;
        }else{
            let index=i-9;
            //5是如何来的 如果有 444，再出现 234 345 456，就是一个错误的组合
            if (cards[index] > 5 || cards[index + 1] > 5 || cards[index + 2] > 5 ){
                continue;
            }
            cards[index] += 1
            cards[index + 1] += 1
            cards[index + 2] += 1
        }
        this.parse_table(cards,eye);
        if (level < 4) {//3*4 + 2(将) = 14？
            this.gen_111_3(cards, level + 1, eye);
        }
        //回溯
        if (i <= 8 ){
            cards[i] -= 3
        } else {
            let index = i - 9
            cards[index] -= 1
            cards[index + 1] -= 1
            cards[index + 2] -= 1
        }
    }
};

Gen.gen_table = function()
{
    let cards = [ 0,0,0,0,0,0,0,0,0];
    // 无眼
    console.log("无眼表生成开始\n");
    this.gen_111_3( cards, 1, false );
    console.log("无眼表生成结束\n");
    // 有眼
    console.log("有眼表生成开始\n");

    cards = [  0,0,0,0,0,0,0,0,0];

    for ( let i = 0; i < 9; i++ )
    {
        cards[ i ] = 2
        console.log("将 %d \n", i)
        this.parse_table( cards, true );
        this.gen_111_3( cards, 1, true );
        cards[ i ] = 0;
    }
    console.log("有眼表生成结束\n");
    console.log("表数据存储开始\n");

    mjlib.MTableMgr.DumpTable();

    console.log("表数据存储结束\n");
};

Gen.main = function()
{
    for ( let i = 0; i<9; i++ )
    {
        gui_tested[ i ] = {};
        gui_eye_tested[ i ] = {};
    }
    console.log("generate table table begin...");
    mjlib.Init();
    this.gen_table();
};