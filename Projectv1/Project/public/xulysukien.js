class Note extends React.Component{
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="div-note">
                <p>{this.props.children}</p>
                <button onClick={() => this.delete(this)}﻿> Xoa </button>
                <button onClick={() => this.edit(this)}﻿> Sua </button>
            </div>
        );
    }
}
var list;
function addClick() {
    ReactDOM.render(<InputDiv />, document.getElementById("div-list-add"))
}
class List extends React.Component {
    constructor(props) {
        super(props);
        list = this;
        this.state={
            mang:[]
        };
    }
    render(){
        return(
            <div className="div-list">
            <div id="div-list-add"></div>
                <button onClick={addClick}> them</button>
                {
                    this.state.mang.map(function (note, index) {
                        return <Note key={index} id={index}>{note}</Note>
                    })
                }
            </div>
        );
    }
    componentDidMount() {
        var that = this;
        $.post("/getDanhSach", function (data) {
            that.setState({ mang: data });
        });
    }
}
class InputDiv extends React.Component {
    constructor(props) {
        super(props);
    }
  
    send() {
        $.post("/add", { note: this.refs.txt.value }, function (data) {
            list.setState({ mang: data });
        });

        ReactDOM.unmountComponentAtNode(document.getElementById('div-list-add'));
    }

    render() {
        return (
            <div className="div-input">
                <input type="text" ref="txt" placeholder="Enter your note!" />
                <button onClick={() => this.send(this)}>Submit</button>
            </div>
        );
    }
}
ReactDOM.render(
    <div>
        <List/>
    </div>
,document.getElementById('root2'));