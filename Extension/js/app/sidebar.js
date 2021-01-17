function loadSideBar(config){
    let sidebar = 
    `<div class='from-right'> 
        <a id='thetogglebutton'><div id='togglebar' class='nav-right hidden-xs'> 
        <div class='button' id='btn thetogglebutton'> 
                <div class='bar top'></div> 
                <div class='bar middle'></div> 
                <div class='bar bottom'></div> 
            </div> </div> </a></div>
            <div class='sidebar'> 
            <div class='sidebar-list'>
                    <h2>Currently Fetching Data from ${config.platform}</h2>
                    <p>The Spoke Chrome Extension is now Fetching Data 😊</p>
                    <p>Meanwhile, please keep this tab open</p>
                    <p>You'll be able to view everything via the Web App Dashboard once 
                    this process is complete</p>
            </div>
    </div>


    <style>
        .hidden{
            display: none;
        }

        #thetogglebutton{
          position: fixed;
          top: 50px;
          right: 80px;
          z-index: 500;
        }

        .sidebar {
          height: 100%;
          width: 400px;
          position: fixed;
          top: 0;
          right: 0;
          /*background-color: #EF8354;*/
          z-index: 200;
        }

        .bar {
          display: block;
          height: 5px;
          width: 50px;
          background-color: #EF8354;
          margin: 10px auto;
        }

        .middle {
          margin: 0 auto;
        }

        .bar {
          -webkit-transition: all .7s ease;
          -moz-transition: all .7s ease;
          -ms-transition: all .7s ease;
          -o-transition: all .7s ease;
          transition: all .7s ease;
        }

        .sidebar-list {
          padding-right: 30px;
          padding-bottom: 50px;
          padding-left: 30px;
          margin: 0;
          list-style: none;
          position: absolute;
          margin-top: 150px;
        }

        .sidebar.active{
          background-color: #E5E9EC;
        }

        .sidebar-list h2{
          padding-bottom: 30px;
          text-align: center;
        }

        .sidebar-list p{
          padding-left: 25px;
          font-size: 15px;
        }
    </style>`;

    var sideNav = document.createElement('div');
    sideNav.innerHTML = sidebar;
    document.body.insertBefore(sideNav, document.body.firstChild);

    function toggleSidebar() {
      $(".button").toggleClass("active");
      $(".sidebar-item").toggleClass("active");
      $(".sidebar").toggleClass("active");
      };

    toggleSidebar();

    var button = document.getElementById('thetogglebutton');
    button.addEventListener('click', function(){
        toggleSidebar();
        $(".sidebar").toggleClass("hidden");
    });
}