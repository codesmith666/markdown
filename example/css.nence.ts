export const css_nence = `
.nence{
    font-family: "";
    font-size: 12pt;
    .italic {
    display: inline-block;
    transform: skewX(-20deg);
    }
    .bold {
    font-weight: bold;
    }
    .italicbold {
    display: inline-block;
    transform: skewX(-20deg);
    font-weight: bold;
    }
    .paragraph {
    margin: 8px 0px;
    }
    .underline {
    text-decoration: underline;
    }
    .strikeLine {
    text-decoration: line-through;
    }
    .teletype {
        font-weight: normal;
        display: inline-block;
        background-color: #e8e8e8;
        padding: 0px 8px;
        margin: 0px 4px;
        border-radius: 4px;
        font-family: monospace;
    }
    .h1 {
    font-size: 30pt;
    margin: 24px 0px 24px 0px;
    padding-bottom: 0px;
    }

    .h2 {
        font-size: 26pt;
        margin: 40px 0px 16px 0px;
        padding-bottom: 0px;
        /* display:inline-block; */
        border-bottom:2px solid black;
    }

    .h3 {
        font-size: 22pt;
        margin: 32px 0px 8px 0px;
        padding-top : 2px
        display:inline-block;
    }
    .h3:before{
        font-size: 22pt;
        padding-right:8px;
        content:"*";
    }

    .h4 {
        font-size: 18pt;
        margin: 24px 0px 8px 0px;
    }
    .h4:before{
        font-size:18pt;
        padding-right:8px;
        content:"-";
    }


    .h5 {
    font-size: 16pt;
    margin: 16px 0px;
    }
    .h5:before{
        font-size:16pt;
        padding-right:6px;
        content:".";
    }

    .h6 {
    font-size: 14pt;
    margin: 8px 0px;
    }

    .separator {
    border: none;
    border-bottom: 5px dotted black;
    margin: 8px 16px;
    }
    .quote {
    border-left: 3px #c0c0c0 solid;
    padding: 0px 16px;
    margin: 4px 0px;
    line-height: 1.8;
    }
    .details {
    margin: 8px 0px;
    border: 1px #a0a0a0 solid;
    padding: 8px;
    border-radius: 8px;
    }
    .nested {
    margin-left: 16px;
    }

    .center {
    display: flex;
    align-items: center;
    justify-content: center;
    }
    .note {
    border-top: 0px;
    border-right: 0px;
    border-bottom: 0px;
    border-radius: 4px;
    padding: 0px;
    margin: 8px 0px;
    line-height: 1.5;
    box-shadow: 2px 2px 2px #808080;
    display: flex;
    //justify-content: center;
    align-items:center;
    // font-weight: bold;
    // vertical-align: middle;
    .icon {
        font-family: "primeicons";
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        display: inline-block;
        -webkit-font-smoothing: antialiased;
        font-size: 32px;
        padding: 8px;
    }
    .icon_note {
        padding:16px 8px 8px 8px;
        color: blue;
    }
    .icon_info {
        padding:16px 8px 8px 8px;
        color: green;
    }
    .icon_warn {
        padding:16px 8px 8px 8px;
        color: orange;
    }
    .icon_alert{
        padding:16px 8px 8px 8px;
        color: red;
    }
    .text {
        margin: 8px;
    }
    }
    .note {
    background-color: #e0e0ff;
    border-left: 6px solid blue;
    }
    .info {
    background-color: #e3f7df;
    border-left: 6px solid green;
    }
    .warn {
    background-color: #fdf9e2;
    border-left: 6px solid orange;
    }
    .alert {
    background-color: #feebee;
    border-left: 6px solid red;
    }
    .inline {
    padding: 8px;
    display: inline-block !important;
    border-radius: 4px;
    }
    .block {
    padding: 16px;
    margin: 8px 0px;
    display: block !important;
    border-radius: 8px;
    }

    .mathjax {
    background-color: #ffffc0;
    box-shadow: 2px 2px #d0d0a0;
    }

    .table {
    display: inline-block;
    background-color: #b0b0b0;
    border-radius: 4px;
    border: 0px;
    border-collapse: separate;
    box-shadow: 1px 1px 5px #808080;
    .th {
        background-color: #e0e0ff;
        padding: 4px;
    }
    .td {
        background-color: white;
        padding: 4px;
    }
    }
    .textLeft {
    text-align: left;
    }
    .textRight {
    text-align: right;
    }
    .textCenter {
    text-align: center;
    }

    .ul {
    margin: 8px 8px;
    list-style-type: disc;
    padding: 0px 24px;
    }
    .ol {
    margin: 8px 8px;
    list-style-type: decimal;
    padding: 0px 24px;
    }
    .li {
    margin: 0px;
    padding: 0px;
    }
    .anchor:link {
    color: blue;
    }
    .anchor:visited {
    color: #c000c0;
    }
    .anchor:hover {
    color: #e00000;
    }
}
`;
