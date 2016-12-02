import React from 'react';
import ReactDom from 'react-dom';
import "../less/index.less";
var SearchBar = React.createClass({
    onHandleChangeText:function(){
        var filterText = this.refs.inp.value;
      this.props.changeText(filterText);  
    },
    render:function(){
        // console.log(this.props.changeFunc)
        return(
            <div className="search">
                <input type="text" ref='inp' onChange={this.onHandleChangeText}/>
                <input type="checkbox" className="checkbox" onClick={this.props.changeFunc}/>  
            </div>
        )
    }
})


// 货物种类：
var ProductCategpry = React.createClass({
    render:function(){
        return(
             <tr><th>{this.props.category}</th></tr>
        )
       
    }
})

// 货物名称：
var ProductRow = React.createClass({
    render: function () {
        var style = {};
        this.props.stocked ? style.color ='black' :style.color='red';
        return(
            <tr style={style} ><td>{this.props.name}</td><td>{this.props.price}</td></tr>
        )
    }
});

// 货物表
var ProductTable = React.createClass({
    
    render:function(){
        var onlyShowStocked = this.props.onlyShowStocked;
        var filterText = this.props.filterText;
        var products = this.props.products;
        var row = [];
        var lastCategory ='';
        products.forEach(function (ele,index) {
            if(lastCategory != ele.category){
                row.push(<ProductCategpry key={index} category={ele.category}></ProductCategpry>);
                lastCategory = ele.category;
            }
            if( !(onlyShowStocked && !ele.stocked) ){
                if(ele.name.indexOf(filterText) !== -1){
                 row.push(<ProductRow key={index+100} name={ele.name} price={ele.price} stocked={ele.stocked}></ProductRow>);
            
               };    
         }    
    })
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody> 
                   {row}
                </tbody>
                </table>
            
        )
    }
});


var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Baskettball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iWatch'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'iPad'},
];


var Appshow = React.createClass({
    // 初始化一个状态：
    getInitialState:function () {
        return{
            onlyShowStocked:false,
            filterText:''
        }
    },
    changeShowStocked: function(){
      this.setState({
          onlyShowStocked: !this.state.onlyShowStocked
      });
    //   console.log(this.state.onlyShowStocked);
    },
    
    changeFilterText:function(text){
      this.setState({
          filterText:text
      })  
    },
    render:function(){
       return (
            <div className="wrapper">
              <SearchBar changeFunc={this.changeShowStocked} changeText={this.changeFilterText} ></SearchBar>
              <ProductTable products={this.props.products} onlyShowStocked={this.state.onlyShowStocked} filterText={this.state.filterText}></ProductTable>
            </div>
           )
    }

});

ReactDom.render(
    <Appshow products={PRODUCTS}></Appshow>,
     document.getElementById('root')
)