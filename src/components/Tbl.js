import React, {Component}  from 'react';
import DataTable from 'datatables.net-dt';
import { inflate } from 'zlib';



const $ = require('jquery');
var AMDjson = require('../data/AMD.json');
const gpudata = [];
var count  = 0;
for(var key in AMDjson){
    if(key == "null"){
        continue;
    }
    gpudata[count] = [key, AMDjson[key]['TDP'], AMDjson[key]['Memory Size'], AMDjson[key]['Length'], AMDjson[key]['Width'], AMDjson[key]['Height']];
    // console.log(gpudata[count-1]);
    
    count++;
}
// console.log(typeof(gpudata[0][0]));
var Nvidiajson = require('../data/NVIDIA.json');
for(var key in Nvidiajson){
    if(key == "null"){
        continue;
    }
    gpudata[count] = [key, Nvidiajson[key]['TDP'], Nvidiajson[key]['Memory Size'], Nvidiajson[key]['Length'], Nvidiajson[key]['Width'], Nvidiajson[key]['Height']];
    // console.log(gpudata[count-1]);
    count++;
}
count--;
while(count >= 0){
    // console.log(gpudata[count]);
    for(var i = 1; i < 6; i++){
        if(gpudata[count][i] == null || gpudata[count][i] == ""){
            gpudata[count][i] = Infinity;
        }
        else{
            gpudata[count][i] = Number(gpudata[count][i].split(" ")[0]);
            // gpudata[count][i] = gpudata[count][i].split(" ")[0];
        }
    }
    count--;
}

// function activateLasers() {
//     console.log("hello");
//   }

export class Tbl extends Component {
    constructor(props) {
        super(props);
        this.data = gpudata;
        this.filter = this.filter.bind(this);
      }
      filter() {
        this.data = [];
        this.table.clear();
        var MinTDP = 0;
        var MaxTDP = Infinity;
        var MinLength = 0;
        var MaxLength = Infinity;
        try{
            if($("#MinTDP").val() != null && $("#MinTDP").val() != ""){
                MinTDP = Number($("#MinTDP").val());
            }
            // MinTDP = Number($("#MinTDP").val());
        }
        catch(err){
            // console.log(err);
        }
        try{
            if($("#MaxTDP").val() != null && $("#MaxTDP").val() != ""){
                MaxTDP = Number($("#MaxTDP").val());
            }
            // MaxTDP = Number($("#MaxTDP").val());
        }
        catch(err){
            // console.log(err);
        }
        try{
            if($("#MinLength").val() != null && $("#MinLength").val() != ""){
                MinLength = Number($("#MinLength").val());
            }
            // MinLength = Number($("#MinLength").val());
        }
        catch(err){
            // console.log(err);
        }
        try{
            if($("#MaxLength").val() != null && $("#MaxLength").val() != ""){
                MaxLength = Number($("#MaxLength").val());
            }
            // MaxLength = Number($("#MaxLength").val());
        }
        catch(err){
            // console.log(err);
        }
        var data = [];
        for (var i = 0; i < gpudata.length; i++) {
            if(gpudata[i][1] >= MinTDP && gpudata[i][1] <= MaxTDP){
                if(gpudata[i][3] >= MinLength && gpudata[i][3] <= MaxLength){
                    data.push(gpudata[i]);
                }
            }
        }
        this.table.rows.add(data);
        this.table.draw();
      }
    componentDidMount() {
        // this.$el = $(this.el);
        this.table = $('#example').DataTable({
            columns: [
                { title: 'Name' },
                { title: 'TDP(W)' },
                { title: 'Memory Size(GB)' },
                { title: 'Length(mm)' },
                { title: 'Width(mm)' },
                { title: 'Height(mm)' }
            ],
            data: this.data,
            "bDestroy": true
        });
        // this.$el.DataTable({
        //     columns: [
        //         { title: 'Name' },
        //         { title: 'TDP(W)' },
        //         { title: 'Memory Size(GB)' },
        //         { title: 'Length(mm)' },
        //         { title: 'Width(mm)' },
        //         { title: 'Height(mm)' }
        //     ],
        //     data: this.data,
        //     "bDestroy": true
        // })
    }
    componentWillUnmount() {
        // this.$el.DataTable.destroy(true);
    }
    render() {
        return (
            <>
            
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <div className="form-floating">
                            <textarea  className="form-control" placeholder="Leave a comment here" id="MinTDP"></textarea>
                            <label >Min TDP</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here" id="MaxTDP"></textarea>
                            <label >Max TDP</label>
                        </div>
                    </div>
                    {/* <div className="col">
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here" id="MinMem"></textarea>
                            <label >Min Memory</label>
                        </div>
                    </div>  */}
                    {/* <div className="col">
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here" id="MaxMem"></textarea>
                            <label >Max Memory</label>
                        </div>
                    </div> */}
                    <div className="col">
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here" id="MinLength"></textarea>
                            <label >Min Length</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here" id="MaxLength"></textarea>
                            <label >Max Length</label>
                        </div>
                    </div>
                    <div className="col">
                        <button onClick={this.filter} type="button" className="btn btn-primary">Apply Filter</button>
                    </div>
                </div>
            </div>
            <hr className="mt-5 mb-4" />
            <div>
                {/* <table className="display" width="100%" ref={el => this.el = el}>
                </table> */}
                <table id="example"  className="display" width="100%" >
                </table>
            </div>
            </>
        );
    }
}

