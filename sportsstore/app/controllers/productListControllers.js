/**
 * Created by dseet on 4/24/2014.
 */
angular.module("sportsStore")
    .constant("productListActiveClass", "btn-primary")
    .constant("productListCount", 3)
    .controller("productListCtrl",
        function($scope, $filter, productListActiveClass, productListCount, cart) {
            var selectedCategory = null;
            $scope.selectedPage = 1;
            $scope.pageSize = productListCount;

            $scope.selectCategory = function(newCategory) {
                selectedCategory = newCategory;
                $scope.selectedPage = 1;
            };
            $scope.selectPage = function(newPage) {
                $scope.selectedPage = newPage;
            };
            $scope.categoryFilterFn = function(product) {
                return (selectedCategory == null) || (product.category == selectedCategory);
            };
            $scope.getCategoryClass = function(category) {
                return (selectedCategory == category) ? productListActiveClass : "";
            };
            $scope.getPageClass = function(page) {
                return ($scope.selectedPage == page) ? productListActiveClass : "";
            };
            $scope.addProductToCart = function(product) {
                cart.addProduct(product.id, product.name, product.price);
            };
        }
);
