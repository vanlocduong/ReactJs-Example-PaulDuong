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
            <div className='div-list'>
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
ReactDOM.render(
    <div>
        <List/>
    </div>
,document.getElementById('root2'));