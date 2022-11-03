//import fetch from "node-fetch";
const apikey = new String("RGAPI-299e7c3d-645a-4837-951c-6e0b18550c52");
const pconsrc = new String("https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/");
const cconsrc = new String("http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/");
const sconsrc = new String("http://ddragon.leagueoflegends.com/cdn/12.20.1/img/spell/");
const perksrc = new String("https://ddragon.leagueoflegends.com/cdn/img/perk-images/");
const itemsrc = new String("https://ddragon.leagueoflegends.com/cdn/12.20.1/img/item/");

let qt = {
    400: '일반',
    420: '솔로랭크',
    430: '일반',
    440: '자유랭크',
    450: '칼바람',
    700: 'clash',
    800: 'AI',
    810: 'AI', 
    820: 'AI',  
    830: 'AI',
    840: 'AI',
    850: 'AI',
    900: 'URF',
    920: 'poro',
    1020: 'ofa',
    1300: 'nbg',
    1400: '궁극기 주문서',
    1900: 'URF',
    2000: 'tut',
    2010: 'tut',
    2020: 'tut',
}

let spell = {
    21: 'SummonerBarrier.png',
    1: 'SummonerBoost.png',
    14: 'SummonerDot.png',
    3: 'SummonerExhaust.png',
    4: 'SummonerFlash.png',
    6: 'SummonerHaste.png',
    7: 'SummonerHeal.png',
    13: 'SummonerMana.png',
    30: 'SummonerPoroRecall.png',
    31: 'SummonerPoroThrow.png',
    11: 'SummonerSmite.png',
    39: 'SummonerSnowURFSnowball_Mark.png',
    32: 'SummonerSnowball.png',
    12: 'SummonerTeleport.png',
    54: 'Summoner_UltBookPlaceholder.png',
    55: 'Summoner_UltBookSmitePlaceholder.png'
}

let puuid; // 소환사 puuid
let name; // 소환사 닉네임
let level; // 소환사 레벨
let p_icon; // 소환사 프로필 아이콘


let kill; // 킬
let death; // 데스
let assist; // 어시

let match = []; // 매치 정보 배열
let mcicon = []; // 매치 챔피언 아이콘 배열
let sname = []; // 매치 소환사 이름 배열
let items = []; // 검색한 소환사 매치 아이템 배열

let perkid = []; // 퍽 정보

let time = 0; // 지연시간(미구현)


async function summoner() {
    let summonername = document.getElementById('sm').value;
    let a = document.getElementById('t-n');
    let a2 = document.getElementById('t-pi');
    let a3 = document.getElementsByClassName("header_img");
    let a4 = document.getElementById('t-l');

    let b = document.getElementsByClassName('kda');
    let b1 = document.getElementsByClassName('it');
    let b2 = document.getElementsByClassName('wd');

    let c1 = document.getElementsByClassName("play_rank");
    let c2 = document.getElementsByClassName("play_day");
    let c3 = document.getElementsByClassName("play_win");
    let c4 = document.getElementsByClassName("play_time");
    let c5 = document.getElementsByClassName("ci");
    let c6 = document.getElementsByClassName("cs");
    let c7 = document.getElementsByClassName("ps");

    let d1 = document.getElementsByClassName("cl");
    let d2 = document.getElementsByClassName("sn");
    let mc = 0;

    fetch("https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonername +"?api_key=" + apikey)
    .then((res) => res.json())
    .then(
        (data) => {
        
        puuid = data.puuid;
        name = data.name;
        level = data.summonerLevel;
        p_icon = data.profileIconId+'.png';

        a.innerText = name;
        a3[0].src = pconsrc + p_icon;
        console.log(p_icon);
        a3.alt = name;
        //a4.innerText = 'Level : ' + level;
        
        for(let i = 0; i <= 9; i++) 
        {
        fetch("https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=20&api_key=" + apikey)
        .then((res) => res.json())
        .then(
            (data) => {


                        match = data;
                    fetch("https://asia.api.riotgames.com/lol/match/v5/matches/" + match[i] + "?api_key=" + apikey)
                    .then((res) => res.json())
                    .then(
                        (data) => {
                            let qi = data.info.queueId; // 큐 아이디
                            let mt = new Date(data.info.gameEndTimestamp); // 게임이 끝난 날짜
                            let gt = data.info.gameDuration; // 게임 진행 시간
                            

                            var month = ("0" + (mt.getMonth() + 1)).slice(-2); //월 2자리
                            var day = ("0" + mt.getDate()).slice(-2); //일 2자리


                            c1[mc].innerText = qt[qi];
                            c2[mc].innerText = month + '/' + day;
                            
                            

                            if (gt%60 < 10)
                            {
                                c4[mc].innerText = Math.floor((gt/60))+':0'+ gt%60; 
                            }
                            else
                            {
                                c4[mc].innerText = Math.floor((gt/60))+':'+ gt%60; 
                            }

                            for (var i = 0; i <= 9; i++) // 검색한 소환사 정보
                            {
                                if (summonername == data.info.participants[i].summonerName)
                                {
                                    kill = data.info.participants[i].kills;
                                    death = data.info.participants[i].deaths;
                                    assist = data.info.participants[i].assists;
                                    let wl = data.info.participants[i].win;
                                    let c_icon = data.info.participants[i].championName + ".png"; // 챔피언 아이콘
                                    let c_spell = [data.info.participants[i].summoner1Id, data.info.participants[i].summoner2Id]
                                    perkid = [data.info.participants[i].perks.styles[0].selections[0].perk, data.info.participants[i].perks.styles[1].selections[0].perk]
                                    items = [data.info.participants[i].item0,data.info.participants[i].item1,data.info.participants[i].item2,
                                            data.info.participants[i].item3,data.info.participants[i].item4,data.info.participants[i].item5];
                                    let ward = data.info.participants[i].item6

                                    b[mc].innerText = kill + '/' + death + '/' + assist;

                                    for(var j = 0; j <= items.length-1; j++)
                                    {
                                        if(items[j] != '0')
                                        {
                                            b1[j+(mc*6)].src = itemsrc + items[j] + '.png';
                                        }else if(items[j] == '0')
                                        {
                                            b1[j+(mc*6)].src = '';
                                        }
                                    }
                                    
                                    b2[0 + mc].src = itemsrc + ward + '.png';
                                    c5[0 + mc].src = cconsrc + c_icon;
                                    c6[0 + (mc*2)].src = sconsrc + spell[c_spell[0]];
                                    c6[1 + (mc*2)].src = sconsrc + spell[c_spell[1]];
                                    
                                    if (wl == true)
                                    {
                                        c3[mc].innerText = "승리";
                                    } 
                                    else if (wl == false)
                                    {
                                        c3[mc].innerText = "패배";
                                    }
                                }
                                    mcicon[i+(mc*10)] = data.info.participants[i].championName + ".png"; // 챔피언 아이콘
                                    if (mcicon[i+(mc*10)] == "FiddleSticks.png")
                                        mcicon[i+(mc*10)] = "Fiddlesticks.png"
                                    sname[i+(mc*10)] = data.info.participants[i].summonerName;


                                    d1[i+(mc*10)].src = cconsrc + mcicon[i+(mc*10)];
                                    d2[i+(mc*10)].innerText = sname[i+(mc*10)];

                            }
                                    fetch("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json")
                                    .then((res) => res.json())
                                    .then(
                                        (data) => {
                                            for(var k = 0; k <= data.length; k++)
                                            {
                                                if(perkid[0] == data[k].id)
                                                {
                                                    var ps = data[k].iconPath;
                                                }
                                                if(perkid[1] == data[k].id)
                                                {
                                                    var ps2 = data[k].iconPath;
                                                }
                                                if(ps && ps2 != null)
                                                {
                                                    break;
                                                }
                                            }
                                            let ps3 = ps.substr(37);
                                            let ps4 = ps2.substr(37);
                                            c7[0+(mc*2)].src = perksrc + ps3;
                                            c7[1+(mc*2)].src = perksrc + ps4;


                                            mc++;
                                            
                                            }
                                
                                        )
                                        
                                    
                        }
                    )
                    
                    
        
                    }
                ) 
        }
        })
        
        .catch(err => { 
            console.log('에러 발생', err)
            alert('존재 하지 않는 소환사 입니다.')
        });
    
}
    /* 지연 시간
    if (time <= 0)
    {
        time = 5;
    }
    if (time == 5)
    {
    let dy = setInterval(sd, 1000);

    function sd() {
        time--;
        console.log(time);
    }

    setTimeout(function(){
        clearInterval(dy);
    }, 5001);
    }
    */
