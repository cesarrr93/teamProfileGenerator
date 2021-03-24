const inquirer = require('inquirer');

let team = [];

const promptManagerTeam = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter your name");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your employee identification?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email?',
                validate: emailInput => {
                    if(emailInput.includes('@')) {
                        return true;
                    } else {
                        return ("Please enter a valid email address!");
                    }
                }
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'What is your office number?'
            },
        ])
        .then(({name, id, email, officeNumber }) => {
            this.manager = new this.Manager(name, id, email, officeNumber);
            team.push(this.manager);
            console.log(team);
            promptManagerTeam()
        })
};

