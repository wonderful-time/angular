angular.module("myapp",[])
.controller("cart",["$scope",function($scope){
    $scope.cart=[
        {
            id:1000,
            name:"ipone5s",
            quantity:3,
            price:4300
        },
        {
            id:1500,
            name:"ipone6s",
            quantity:10,
            price:7000
        },
        {
            id:3000,
            name:"mac",
            quantity:8,
            price:4300
        },
        {
            id:2000,
            name:"ipone4s",
            quantity:6,
            price:2300
        }
    ];
//    计算购物总价
        $scope.todalPrice=function(){
            var total=0;
            angular.forEach($scope.cart,function(item){
                total+=item.quantity * item.price;
            })
            return total;
        }
//      计算总购买数
        $scope.totalQuantity=function(){
            var total=0;
            angular.forEach($scope.cart,function(item){
                total+=parseInt(item.quantity);
            })
            return total;
        }
        //添加一个
        $scope.add=function(id){
            var index=findIndex(id);
            if(index!==-1){
                ++$scope.cart[index].quantity;
            }
        }

        //减产品
        $scope.reduce=function(id){
            var index=findIndex(id);
            if(index!=-1){
                var item=$scope.cart[index];
                if(item.quantity>1){
                    --item.quantity;
                }else{
                    var returnKey=confirm("是否从购物车删除该产品！");
                    if(returnKey){
                        $scope.remove(id);
                    }
                }
            }
        }

        //找到一个元素的索引
        findIndex=function(id){
            var index=-1;
            angular.forEach($scope.cart,function(item,key){
                if(item.id===id){
                    index=key;
                    return ;
                }
            })
            return index;
        }
        //移除一项
        $scope.remove=function(id){
            var index=findIndex(id);
            angular.forEach($scope.cart,function(item,key){
                if(item.id===id){
                    index=key
                }
            })
            if(index!=-1){
                $scope.cart.splice(index,1);
            }
        }

//        如果输入为-1时还是有问题的，因为物品不能为负啊
        $scope.$watch("cart",function(newValue,oldValue){
            angular.forEach(newValue,function(item,key){
                if(item.quantity<1){
                    var returnKey=confirm("真的要删除吗？")
                    if(returnKey){
                        $scope.remove(item.id)
                    }else{
                        item.quantity=oldValue[key].quantity;
                    }
                    return;
                }
            })
        },true)

}])