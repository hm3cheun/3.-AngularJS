'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.showMenu = true;
            $scope.message = "Loading ...";
            $scope.dishes = menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });

            $scope.select = function(setTab) {
                $scope.tab = setTab;

                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };

            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", telephone: {area_code:" ", number:" "}, agree:false, email:"" };

            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

            $scope.channels = channels;
            $scope.invalidChannelSelection = false;

        }])
        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {


            $scope.sendFeedback = function() {

                console.log($scope.feedback);

                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.getFeedbacks().save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",telephone: {area_code:" ", number:" "}, agree:false, email:"" };
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

          $scope.showDish = false;
          $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
              .$promise.then(
                  function(response){
                      $scope.dish = response;
                      $scope.showDish = true;
                  },
                  function(response) {
                      $scope.message = "Error: "+response.status + " " + response.statusText;
                  }
                );

}])

          .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};

            $scope.submitComment = function () {

                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);

                $scope.dish.comments.push($scope.mycomment);
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);

                $scope.commentForm.$setPristine();

                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            $scope.leaders= [];
            $scope.showLeaders = false;
            $scope.leaders_message="...Loading";
            $scope.leaders = corporateFactory.getLeaders().query()
            .$promise.then(
                      function(response){
                          $scope.leaders = response;
                          $scope.showLeaders = true;
                      },
                      function(response) {
                          $scope.leaders_message = "Error retriving Leaders: "+response.status + " " + response.statusText;
                      }
                  );


        }])



        .controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function($scope, corporateFactory, menuFactory) {

                  $scope.showPromotion = false;
                  $scope.showEC = false;
                  $scope.showDish = false;
                  $scope.dish_message="Loading ...";
                  $scope.dish = menuFactory.getDishes().get({id:0})
                  .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.dish_message = "Error retriving feature dish: "+response.status + " " + response.statusText;
                                $scope.showDish = false;
                            }
                        );

                  $scope.promo_message="Loading ...";
                  $scope.promotion = menuFactory.getPromotion().get({id:0})
                  .$promise.then(
                            function(response){
                                $scope.promotion = response;
                                $scope.showPromotion = true;
                            },
                            function(response) {
                                $scope.promo_message = "Promotion Error: "+response.status + " " + response.statusText;

                            }
                        );

                  $scope.ec_message="Loading ...";
                  $scope.ec = corporateFactory.getLeaders().get({id:3})
                  .$promise.then(
                            function(response){
                                $scope.ec = response;
                                $scope.showEC = true;
                            },
                            function(response) {
                                $scope.ec_message = "Error retriving Leader: "+response.status + " " + response.statusText;
                            }
                        );

        }])

        // implement the IndexController and About Controller here


;
