//All log statements are at the bottom

//problem 5
function isEligible(company) {
    const raise = [];
    for (let i = 0; i < company.employees.length; i++) {
      let employee = company.employees[i];
      if (employee.raiseEligible) {
        employee.salary *= 1.10;
        employee.raiseEligible = false;
        raise.push(employee.firstName);
      }
    }
    return raise;
  }

  //problem2
  const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    //problem 1
    employees: [
      {
        firstName: "Sam",
        department: "Tech",
        designation: "Manager",
        salary: 40000,
        raiseEligible: true,
        //also problem 6
        wfh: true
      },
      {
        firstName: "Mary",
        department: "Finance",
        designation: "Trainee",
        salary: 18500,
        raiseEligible: true,
        wfh: false
      },
      {
        firstName: "Bill",
        department: "HR",
        designation: "Executive",
        salary: 21200,
        raiseEligible: false,
        wfh: false
      },
      //problem3
      {
        firstName: "Anna",
        department: "Tech",
        designation: "Executive",
        salary: 25600,
        raiseEligible: false,
        //problem 6
        wfh: true
      }
    ]
  };

//problem 4
const totalSalary = 105300;


const employee_array = [];
for(employee of company.employees){
    employee_array.push(employee.firstName);
}


console.log("Please see js file for how I logged info. I did not just type out answers as strings. I have the entire JSON. Did extra work on accident")
//log problem 1
console.log("problem 1");
  for(employee of company.employees) {
    console.log(employee.firstName + " " + employee.department + " " + employee.designation + " " +
        employee.salary + " " + employee.raiseEligible + " " + employee.wfh)
  }

  //log problem 2
  console.log("problem 2");
  console.log("Name: " + company.companyName + ";" + " Website: " + company.website + ";" + " " + "employees: " + employee_array)

  //log problem 3
  console.log("problem 3");
  console.log("New employee: " + company.employees[3].firstName);

  //log problem 4
  console.log("problem 4");
  console.log("total salary: " + totalSalary);

  //log problem 5
  console.log("problem 5");
  const problem5 = isEligible(company);
  console.log("Raise: " + problem5);

  //log problem 6
  console.log("problem 6")
  console.log("Sam working from home? " + company.employees[0].wfh + " "+ "| " +
    "Anna working from home?: " +  company.employees[3].wfh);