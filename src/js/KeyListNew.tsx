import * as React from 'react';
import { generatedata } from './lib/generatedata';
import * as ReactDOM from 'react-dom'
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';
import JqxInput from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxinput';
import JqxDropDownList, { IDropDownListProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxdropdownlist';
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import '../effect/jqx.css';

export interface IState extends IGridProps {
    dropDownSource: IDropDownListProps['source'];
}

export default class KeyListNew extends React.PureComponent<{storage: number, delete: Function}, IState> {
    screen = window.outerWidth;
    private myGrid = React.createRef<JqxGrid>();
    private mySelectRowBtn = React.createRef<JqxButton>();
    private myInput1 = React.createRef<JqxInput>();
    private selectedRowIndex = React.createRef<HTMLSpanElement>();
    private unselectedRowIndex = React.createRef<HTMLSpanElement>();
    private selected = 0;
    constructor(props: {storage: number, delete: Function}) {
        super(props);
        this.scrollToBtnOnClick = this.scrollToBtnOnClick.bind(this);
        this.enableHoverOnChange = this.enableHoverOnChange.bind(this);
        this.myGridOnRowSelect = this.myGridOnRowSelect.bind(this);
        const source: any = {
            datafields: [
                { name: 'no', type: 'number' },
                { name: 'address', type: 'string' },
                { name: 'UncomperssedPub', type: 'string' },
                { name: 'ComperssedPub', type: 'string' },
                { name: 'pri', type: 'string' },
                { name: 'isEnc', type: 'string' },
            ],
            datatype: 'array',
            localdata: generatedata(this.props.storage, false)
        };
        
        const rendertoolbar = (toolbar: any): void => {
            const deleteRowClick = () => {
                const selectedrowindex = this.myGrid.current!.getselectedrowindex();
                const rowscount = this.myGrid.current!.getdatainformation().rowscount;
                if (selectedrowindex >= 0 && selectedrowindex < parseFloat(rowscount!)) {
                    const id = this.myGrid.current!.getrowid(selectedrowindex);
                    var keys = Object.keys(localStorage);  
                    var value = JSON.parse(localStorage.getItem(keys[selectedrowindex])!);
                    localStorage.removeItem(value.address);
                    this.myGrid.current!.deleterow(id);
                    this.props.delete();
                }
                (document.getElementById('signIn2') as HTMLInputElement).value = "";
                (document.getElementById('signIn2') as HTMLInputElement).removeAttribute("disabled");
            }
            ReactDOM.render(
                <div>
                    <div id="buttonContainer1" style={{ float: 'right', marginRight: '5px' }}>
                        <JqxButton onClick={deleteRowClick} height={35} width={150} value={'Delete Selected Row'} />
                    </div>
                </div>,
                toolbar[0]
            );

        };
        this.state = {
            columns: [
                { text: 'Address', datafield: 'address', width: (window.outerWidth - 150) / 4 },
                { text: 'Uncomperssed Pubkey', datafield: 'UncomperssedPub', width: (window.outerWidth - 150) / 4 },
                { text: 'Comperssed Pubkey', datafield: 'ComperssedPub', width: (window.outerWidth - 150) / 4 },
                { text: 'Privatekey', datafield: 'pri', width: (window.outerWidth - 150) / 4 },
                { text: 'Is Encrypted', datafield: 'isEnc', width: 80 },
            ],
            dropDownSource: ['none', 'single row', 'multiple rows', 'multiple rows extended'],
            ready: () => {
                this.myGrid.current!.selectrow(2);
            },
            rendertoolbar,
            source: new jqx.dataAdapter(source)
        }
    }
    componentDidUpdate(prevProps: { storage: number; }, prevState: any) {
        if (this.props.storage !== prevProps.storage) {
            const source: any = {
                datafields: [
                    { name: 'no', type: 'number' },
                    { name: 'address', type: 'string' },
                    { name: 'UncomperssedPub', type: 'string' },
                    { name: 'ComperssedPub', type: 'string' },
                    { name: 'pri', type: 'string' },
                    { name: 'isEnc', type: 'string' },
                ],
                datatype: 'array',
                localdata: generatedata(this.props.storage, false)
            };
            this.setState({
                ...this.state,
                source: new jqx.dataAdapter(source)
            })
        }
    }

    public render() {
        return (
            <div style={{ fontSize: '13px', fontFamily: 'Verdana', float: 'left' }}>
                <JqxGrid ref={this.myGrid} onRowselect={this.myGridOnRowSelect}
                    width={this.screen - 50} height={350} source={this.state.source} columns={this.state.columns} style={{ float: 'left', position: 'relative', left: '25px' }} 
                    showtoolbar={true} rendertoolbar={this.state.rendertoolbar} />
                <div style={{ marginTop: '20px' }}>
                    &nbsp;
                </div>
            </div>
        );
    }
    private scrollToBtnOnClick(): void {
        const index = parseInt(this.myInput1.current!.getOptions('value'), 10);
        if (!isNaN(index)) {
            this.myGrid.current!.ensurerowvisible(index);
        }
    };
    private enableHoverOnChange(event: any): void {
        this.myGrid.current!.setOptions({ enablehover: event.args.checked });
    };
    private myGridOnRowSelect(event: any): void {
        this.selected = event.args.rowindex;
        var keys = Object.keys(localStorage);
        var addr = keys[this.selected];
        var value = JSON.parse(localStorage.getItem(addr)!);
        if (value.isEncrypted == false) {
            (document.getElementById('signIn3') as HTMLInputElement).style.display = "none";
            (document.getElementById('signIn3') as HTMLInputElement).value = "";
            (document.getElementById('aTag_pin') as HTMLInputElement).style.display = "none";
            (document.getElementById('effectDecIn4') as HTMLInputElement).style.display = "none";
            (document.getElementById('rsaDecIn3') as HTMLInputElement).style.display = "none";
            (document.getElementById('aTag_pin2') as HTMLInputElement).style.display = "none";
            (document.getElementById('aTag_pin3') as HTMLInputElement).style.display = "none";
        }
        else {
            (document.getElementById('signIn3') as HTMLInputElement).style.display = "block";
            (document.getElementById('aTag_pin') as HTMLInputElement).style.display = "block";
            (document.getElementById('effectDecIn4') as HTMLInputElement).style.display = "block";
            (document.getElementById('rsaDecIn3') as HTMLInputElement).style.display = "block";
            (document.getElementById('aTag_pin3') as HTMLInputElement).style.display = "block";
            (document.getElementById('aTag_pin2') as HTMLInputElement).style.display = "block";
        }
        (document.getElementById('signIn2') as HTMLInputElement).value = value.privateKey;
        sessionStorage.setItem('selected', addr);
        (document.getElementById('signIn2') as HTMLInputElement).setAttribute("disabled", "disabled");              
    };
}