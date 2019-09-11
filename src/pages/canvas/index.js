import React from 'react';
import Layout from '../../components/Layout'
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import styled from 'styled-components'
import data from "./data.json";

import build from '../../img/build-2.svg';
import explore from '../../img/explore-2.svg';
import focus from '../../img/focus-2.svg';
import harvest from '../../img/harvest-2.svg';
import immerse from '../../img/immerse-2.svg';
import optimize from '../../img/optimize-2.svg';
import plan from '../../img/plan-2.svg';
import retier from '../../img/retier-2.svg';
import stabilize from '../../img/stabilize-2.svg';

let nodes = data.nodes;
let nody = {}
let allLinks = {}
let bigNode = {};
let linkCount = 0;

let color = (type) => {
    switch (type) {
        case '1-userExperience':
            return 'rgb(255, 171, 64)';
        case '2-marketSense':
            return 'rgb(142, 124, 195)';
        case '4-customerSuccess':
            return 'rgb(109, 158, 235)';
        case '3-technologyExcellence':
            return 'rgb(106, 168, 79)';
        default:
            return '#9a8d8d1a';
    }
}

let xPos = (type) => {
    switch (type) {
        case '1-userExperience':
            return 0;
        case '2-marketSense':
            return 300;
        case '4-customerSuccess':
            return 700;
        case '3-technologyExcellence':
            return 1100;
        default:
            return null;
    }
}

let yPos = (type) => {
    switch (type) {
        case '1-Explore':
            return { y: 0 };
        case '2-Focus':
            return { y: 800 };
        case '3-immerse':
            return { y: 1850 };
        case '4-Plan':
            return { y: 3050 };
        case '5-Build':
            return { y: 4700 };
        case '6-Stabilize':
            return { y: 6950 };
        case '7-Optimize':
            return { y: 8900 };
        case '8-Harvest':
            return { y: 10700 };
        case '9-Retire':
            return { y: 11800 };
        default:
            return null;
    }
}

nodes.sort((current, next) => (current.group > next.group) ? 1 : (current.group === next.group) ? ((current.type > next.type) ? 1 : ((current.order > next.order) ? 1 : -1)) : -1);


nodes.map((node, i) => {

    // node structure
    let colorType = color(node.type);
    let pos = yPos(node.group);
    let ports = {}

    let out = {
        port1: {
            id: "port1",
            type: "output"
        }
    }
    ports = Object.assign(ports, out);

    let input = {
        port2: {
            id: "port2",
            type: "input"
        }
    }
    ports = Object.assign(ports, input);

    nody = {
        id: node.id,
        title: node.title,
        color: colorType,
        type: "default",
        url: node.url,
        position: {
            x: 50 + xPos(node.type) + node.order * 10,
            y: node.order * 150 + pos.y
        },
        ports: ports
    };

    bigNode[`${node.id}`] = nody;

    // link structure
    node.to.map((link, i) => {
        let linkd = {
            id: `link${linkCount + 1}`,
            from: {
                nodeId: node.id,
                portId: "port1"
            },
            to: {
                nodeId: link,
                portId: "port2"
            }
        }
        linkCount++;
        allLinks[`link${linkCount}`] = linkd;
        return true;
    });
    return true;
});

const complexChart = {
    offset: {
        x: 0,
        y: 0
    },
    nodes: bigNode,
    links: allLinks,
    selected: {},
    hovered: {}
}


const Outer = styled.div`
    padding: 30px;
    border-radius: 4px;
    box-shadow: 0px 0px 0px 0px rgba(239,235,233,0), 
        10px -10px 20px -4px rgba(144,148,154,0.38);
`
const CanvasOuterCustom = styled.div`
  text-align: center
  position: relative;
  background-size: 10px 10px;
  background-color: #fff;
  width: 100%;
  height: 13500px;
  overflow-x: scroll;
  cursor: not-allowed;
  outline: none !important;
  background-position:
      top 0px left 0px, // explore
      top 950px left 0px, // focus
      top 1950px left 0px, // immerse
      top 3100px left 0px, //plan
      top 4750px left 0px, //build
      top 6950px left 0px, //stabilize
      top 8950px left 0px,
      top 10800px left 0px,
      top 12000px left 0px;
  background-repeat: no-repeat;
  background-size: 
    100% 800px ,  // explore
    100% 1050px, // focus
    100% 1250px, // immerse
    100% 1750px, // plan
    100% 2350px, // build
    100% 2100px, // stabilize
    100% 1900px, // optimize
    100% 1300px,
    100% 1700px;
  background-image:
    url(${explore}),
    url(${focus}),
    url(${immerse}),
    url(${plan}),
    url(${build}),
    url(${stabilize}),
    url(${optimize}),
    url(${harvest}),
    url(${retier});
`

const CanvasInnerCustom = styled.div`
width: 100%;
position: relative;
cursor: move;
`

const NodeInnerCustom = ({ node }) => {
    if (node.type) {
        return (
            <Outer style={{background: `linear-gradient(to bottom , ${node.color} , white )`}}>
                {node.id.replace(/_/g, ' ')}
                <br />
                <a href={node.url}>Link</a>
            </Outer>
        )
    }
}

export default class CanvasIndexPage extends React.Component {
    render() {
        return (
            <Layout>
                <div>
                    <FlowChartWithState config={{ readonly: true }} Components={{
                        NodeInner: NodeInnerCustom,
                        CanvasOuter: CanvasOuterCustom,
                        CanvasInner: CanvasInnerCustom
                    }} initialValue={complexChart} />
                </div>
            </Layout>
        )
    }
}
