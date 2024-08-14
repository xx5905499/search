//https://api.kirka.io/api/inventory
//

const user_img = document.querySelector(".user_img");
const userName = document.querySelector(".user_name h1");
const friends = document.querySelector(".friends");
let user_name = '';

//when user writer user name in text box
function inputFunction() {
    let input_user = document.querySelector(".input_user").value.trim();
    //trim method will replace before and after white space of given calue

    if (input_user.length <= 0) {
        alert("You did not enter github user name");
        document.querySelector(".input_user").value = "";
        document.querySelector(".input_user").focus();
        return false;
    } else {
        user_name = input_user.split("").join("");
        //if everything is ok run fetch user funciton
        fetchUser(); // this funciton is not made yet

        //clear the input box and focused it for next
        document.querySelector(".input_user").value = "";
        document.querySelector(".input_user").focus();
    }
};

btn_submit.addEventListener("click", function () {
    inputFunction()
});

// if user press enter it should be submit 
document.querySelector(".input_user").addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        //alert("you have pressed enter key");
        inputFunction()
    }
})

//fetching inventory from Kirka api
function fetchUser() {
    fetch(`https://api.kirka.io/api/inventory/${user_name}`)
        .then(response => response.json())
        .then(function (data) {
            //I not testing live because unregistered user can hit data only 60 time per hour
            console.log(data);
            if (data.message === "Not Found") {
                alert("inventory not found Or something is not working");
                return false;
            } else {
                user_img.innerHTML = `<img src="${data.avatar_url}">`;
                userName.innerHTML = data.login;
                followers_.innerHTML = data.followers;
                follow_.innerHTML = data.following;

            }
        })

    //fetching Inventory
    fetch(`https://api.kirka.io/api/inventory/${user_name}/repos`)
        .then(response => response.json())
        .then(function (repo_data) {
            console.log(repo_data);
            //if user type random name which is user but not have repository
            if (repo_data.length <= 0) {
                repo_details.innerHTML = `
                
                <div class="item_">
                    <div class="repo_name">No Repo Found</div>                
                </div>
                
                `
            } else {
                //when you type random user name if user and repo both not found
                if (repo_data.message === "Not Found") {
                    repo_details.innerHTML = `
                    <div class="item_">
                        <div class="repo_name">kirka</div>
                        <div class="friends">
                            <div class="info_ star">
                                <i class="fa fa-star-o"></i>10
                            </div>
                            <div class="info_ fork">
                                <p><i class="fa fa-code-fork"></i>30</p>
                            </div>
                            <div class="info_ size">
                                <p><i class="fa fa-file"></i>3000kb</p>
                            </div>
                        </div>
                    </div>                
                    `
                    user_img.innerHTML = `<img src="images/github_logo.png">`;
                    userName.innerHTML = `Unknown`;
                    followers_.innerHTML = "-";
                    follow_.innerHTML = "-";
                } else {
                    let repo_Data = repo_data.map(item => {
                        console.log(item);
                        return (
                            `
                            <div class="item_">
                                <div class="repo_name">${item.name}</div>
                                <div class="repo_details_">
                                    <div class="info_ star">
                                        <i class="fa fa-star-o"></i>
                                        ${item.watchers}
                                    </div>
                                    <div class="info_ fork">
                                        <p><i class="fa fa-code-fork"></i>
                                        ${item.forks}
                                        </p>
                                    </div>
                                    <div class="info_ size">
                                        <p><i class="fa fa-file"></i>
                                        ${item.size}kb
                                        </p>
                                    </div>
                                </div>
                            </div> 
                            `
                        );
                    })
                    //I am taking maximum 6 repos
                    // you can tak according to your requirement
                    repo_details.innerHTML = repo_Data.slice(0, 6).join("");

                }
            }

        });
}
