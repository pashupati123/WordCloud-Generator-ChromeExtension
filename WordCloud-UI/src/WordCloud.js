import React, { Component } from 'react'
import axios from 'axios'
import './index.css'


export class WordCloud extends Component {

    constructor(props) {
        super(props)

        this.state = {
            textdata: "",
            img: "",
            img_src: "",
            flag : 0,
            gentext: "Generate WordCloud"
        }
        this.handleChange = this.handleChange.bind(this)
    }



    handleChange = (e) => {
        var input = e.target;
        var reader = new FileReader();
        const scope = this
        reader.onload = function () {
            var text = reader.result;
            scope.setState({ textdata: reader.result })

        };
        reader.readAsText(input.files[0]);

    }

    apicall = () => {
        const scope = this
        // axios.post('http://18.216.215.25:8080/wordcloud', {
        //     'text': this.state.textdata
        // })
        axios.post('https://wordcloudapi-service.dev.target.com/wordcloud', {
           'text': this.state.textdata
         })
            .then(function (response) {
                console.log(response.data.ImageBytes);
                scope.setState({ img: response.data.ImageBytes })
                const src = "data:image/png;base64 , " + response.data.ImageBytes
                scope.setState({ img_src: src })
                scope.setState({flag:1})
                scope.setState({gentext:"download WordCloud"})
            })
    }

    handleSubmit = () => {
        this.setState({flag:2})
        this.apicall()

    }

    render() {
        if(this.state.flag===1){
            return(<>
             <div >
               

                    <a className="button button2" href={this.state.img_src} download>
                {this.state.gentext}
                </a>

           
           




            </div>
            </>)
        }
        else if(this.state.flag===2)
        {
            return(
                <div >
               

                <a className="button button2" href={this.state.img_src} download>
            generating....
            </a>

       
       




        </div>
            )
        }
        return (
            <div >
                <card>
                    <input style={{ backgroundColor: "#cc0000", color: "white" }} className="file" type="file" id="myfile" name="myfile" onChange={this.handleChange}></input>
                    <br />



                    <button className="button button2" onClick={() => { this.handleSubmit() }}>{this.state.gentext}</button>
                </card>

            </div>
        )
    }
}

export default WordCloud
