import { BreakLayout, Widget } from '../lib';

import styled from 'styled-components';
import { IWidget } from '../lib/types';

const LayoutWrapper = styled(BreakLayout)`
  background-color: #e2e2e2;
  .box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    /* > div:nth-child(2) {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    } */
  }
  .draggable {
    top: 6px;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 50px;
    height: 10px;
    cursor: grab;
    hr {
      border: none;
      width: 100%;
      margin-top: 3px;
      border-top: 4px solid #e2e2e2;
      transition: all 0.3s ease-in-out;
    }
    &:hover hr {
      border-color: #00ba3d;
    }
  }
`;

const REACT_GRID_LAYOUT_BEDROCK: Record<string, IWidget[]> = {
  lg: [
    { id: 'infos', x: 0, y: 0, w: 14, h: 2, minW: 8, minH: 2 },
    { id: 'charts', x: 0, y: 3, w: 14, h: 22, minW: 12, minH: 14 },
    { id: 'books', x: 14, y: 0, w: 5, h: 24, minW: 5, minH: 22 },
    { id: 'orders', x: 0, y: 22, w: 19, h: 20, minW: 10, minH: 8 },
    { id: 'panels', x: 19, y: 0, w: 5, h: 24, minW: 5, minH: 18 },
    { id: 'details', x: 19, y: 0, w: 5, h: 20, minW: 5, minH: 10 },
  ],
  md: [
    { id: 'infos', x: 0, y: 0, w: 12, h: 2, minW: 6, minH: 2 },
    { id: 'charts', x: 0, y: 3, w: 12, h: 20, minW: 10, minH: 14 },
    { id: 'books', x: 12, y: 0, w: 4, h: 22, minW: 4, minH: 22 },
    { id: 'orders', x: 0, y: 22, w: 16, h: 18, minW: 8, minH: 6 },
    { id: 'panels', x: 16, y: 0, w: 4, h: 22, minW: 4, minH: 18 },
    { id: 'details', x: 16, y: 0, w: 4, h: 18, minW: 4, minH: 10 },
  ],
  sm: [
    { id: 'infos', x: 0, y: 0, w: 12, h: 2, minW: 6, minH: 2 },
    { id: 'charts', x: 0, y: 3, w: 12, h: 18, minW: 10, minH: 14 },
    { id: 'books', x: 12, y: 0, w: 4, h: 20, minW: 4, minH: 20 },
    { id: 'orders', x: 0, y: 20, w: 16, h: 16, minW: 8, minH: 6 },
    { id: 'panels', x: 16, y: 0, w: 4, h: 20, minW: 4, minH: 18 },
    { id: 'details', x: 16, y: 0, w: 4, h: 16, minW: 4, minH: 10 },
  ],
  xs: [
    { id: 'infos', x: 0, y: 0, w: 12, h: 2, minW: 6, minH: 2 },
    { id: 'charts', x: 0, y: 3, w: 12, h: 18, minW: 10, minH: 14 },
    { id: 'books', x: 12, y: 0, w: 5, h: 20, minW: 5, minH: 20 },
    { id: 'orders', x: 0, y: 20, w: 17, h: 16, minW: 8, minH: 6 },
    { id: 'panels', x: 17, y: 0, w: 5, h: 20, minW: 5, minH: 18 },
    { id: 'details', x: 17, y: 0, w: 5, h: 16, minW: 5, minH: 10 },
  ],
};

function TextWidget() {
  return (
    <div style={{ padding: '10px' }}>
      石堡城也称“铁仞城”。坐落于今青海省西宁市湟源县西南25公里处的日月藏族乡莫多吉，石堡城就建在高约300米的东山上，其顶部海拔3600米，地势相对平缓，东、西、南三面为悬崖绝壁，构成了三角形状的天然城堡。只有一小径通其顶部，极其险要，真可谓一夫当关，万夫莫开。
      　　而石堡城再向南15公里，就是日月山，地处黄土高原与青藏高原的叠合区，是青海省内外流域的天然分界线，划分了农耕文明与游牧文明。
      ￼ 　　莫多吉村，蒙古语为森林多的意思，恰好就是石堡城山角下一个美丽的小村庄。
      　　据史书记载，隋朝五年（公元581年），隋军在石堡城（今莫多吉村），修建石堡城设戍屯兵。1983年体制改革更名为日月藏族乡莫多吉村。全村总户数为261户，总人口为1040人，有汉、藏、土、蒙古族等民族。总面积为4平方千米，其中耕地面积为1.5平方千米。农业以种植青稞、油菜籽为主。主要经济来源为养殖业、外出打工等。
      　　别看莫多吉村不大，但该村辈辈出英才
      ，代代有能人，特别是解放后，莫多吉村受传统思想及文化教育的影响，每年考上大学的人数不胜数，毕业后走上领导岗位及投身教育事业的人大有人在。
      　　改革开放后，莫多吉村人材流失严重，大部分人随着工作环境的变化，而定居在县、市及外省城市。现在留守莫多吉村的村民只占原村民的60%左右。
      　　￼
      　　上初高中时我曾和小伙伴们几次去莫多吉村北面的石堡城玩，那时候从大人们口中知道它叫方台，还不知道方台还有个小名叫石堡城。更不知道它还有个别名叫“铁仞城”。
      　　去石堡城玩不为别的，只为像其他人说的那样，里面有许多古钱币（麻钱），可我太贪玩，虽去了几次，却一枚铜钱都没找到，只捡到几片瓦罐或砖的碎片。
      　　另外还有一个想去的理由就是上石堡城的石缝里有条锈迹斑斑的铁链，这里怎么会有铁链？是谁放上去的一直是个迷。少年时往往经不住诱惑，为了一探究竟，我们就相约去爬石堡城。
      　　每次去石堡城玩都是瞒着大人们偷着去的。因为大人们都说那里是“死人沟”
      “万人台”。石堡城下面埋了无数的死人，但到底是怎么回事，他们吱吱唔唔地也说不清楚。当然，有时我们也会从那里发现一些大骨头，可我们并不害怕，相反总认为那是从山顶上摔下来的牛或其它动物的骨头。
      　　直到高中毕业后才知道，原来那里是古战场，方台原名叫石堡城，历史上这里发生了无数次的争夺战，死伤的人不计其数，其中最大，最残酷的一场战争是由哥舒翰率领的唐朝军队与土蕃守军的较量，此次争夺战，死人数万，石堡城下的山沟里血流成河。当时，石堡城山下还没有人居住，这里自然就成了哥舒翰临时驻扎的兵营。
      　　￼
      　　如果你有勇气攀登上石堡城山顶，你就会发现，山上有大小不一的两个平台，北边为小方台，长宽均约40米，南部为大方台，长约50米、宽约15米，两平台之间有一条狭窄的山脊相连。台上还有两个石砌小高台，据传是烽火台，紧邻悬崖边上有残存的房屋基址，周边放布着大量的砖瓦残片。
      　　考古工作者曾在大小方台上采集到唐代开元通宝钱币。在附近的照壁山上有兵行道，山下有料瓣台、点将台、万人坑、马场台、马场弯等军事遗址。
      　 传说石堡城这座军事要塞是隋朝五年（609
      年），隋炀帝统兵西征吐谷浑时依山构筑，“石城门峻谁开辟，更鼓误闻风落石。界天白岭胜金汤，镇压西南天半壁”。这首隋朝名将史万岁笔下的《石堡山》诗，可以验证石堡城是当时非常重要的一个军事据点。
      　　　唐开元五年（717年）为吐蕃所据。
      　　从开元十七年（729年）起，唐朝与吐蕃在这里开展拉锯战，双方反复争夺此城。唐军占领石堡城后，曾在此城设振武军、神武军、天威军。
      　　￼ (二) 后来，石堡城又被吐蕃军队占领，
      占领石堡城后，即派重兵把守，并以此为前哨阵地，屡屡出兵，攻扰唐河西、陇右等地区。为此，唐朝视石堡城的吐蕃军队为心腹大患。
      唐开元十七年三月 （729年3月），唐玄宗李隆
    </div>
  );
}

function ChartDemo() {
  return (
    <main>
      <h1>ChartLayout Demo</h1>
      <LayoutWrapper
        className="container"
        breakWidgets={REACT_GRID_LAYOUT_BEDROCK}
        breakPoints={{ lg: 1920, md: 1680, sm: 1440, xs: 1280 }}
        breakCols={{ lg: 24, md: 20, sm: 20, xs: 22 }}
        breakGap={[1, 1]}
        breakRowHeight="34px"
        draggableHandle=".draggable"
        initCompact
      >
        <Widget className="box" id="infos">
          <div className="draggable">
            <hr />
          </div>
          <div>infos</div>
          <TextWidget />
        </Widget>
        <Widget className="box" id="charts">
          <div className="draggable">
            <hr />
          </div>
          <div>charts</div>
          <TextWidget />
        </Widget>
        <Widget className="box" id="books">
          <div className="draggable">
            <hr />
          </div>
          <div>books</div>
          <TextWidget />
        </Widget>
        <Widget className="box" id="orders">
          <div className="draggable">
            <hr />
          </div>
          <div>orders</div>
          <TextWidget />
        </Widget>
        <Widget className="box" id="panels">
          <div className="draggable">
            <hr />
          </div>
          <div>panels</div>
          <TextWidget />
        </Widget>
        <Widget className="box" id="details">
          <div className="draggable">
            <hr />
          </div>
          <div>details</div>
          <TextWidget />
        </Widget>
      </LayoutWrapper>
    </main>
  );
}

export default ChartDemo;
