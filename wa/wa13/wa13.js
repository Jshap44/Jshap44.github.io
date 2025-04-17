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

//Problem 1
const employees = [
    {
      firstName: "Sam",
      department: "Tech",
      designation: "Manager",
      salary: 40000,
      raiseEligible: true,
      //problem 6
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
    //problem 3
    {
      firstName: "Anna",
      department: "Tech",
      designation: "Executive",
      salary: 25600,
      raiseEligible: false,
      // also problem 6
      wfh: true
    }
  ];
  //problem 4
  const totalSalary = 105300;

  //problem2
  const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
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
      //also problem3
      {
        firstName: "Anna",
        department: "Tech",
        designation: "Executive",
        salary: 25600,
        raiseEligible: false,
        //also problem 6
        wfh: true
      }

    ]
  };

console.log("problem 1")
  for(employee of employees) {
    console.log(employee.firstName + " " + employee.department + " " + employee.designation + " " +
        employee.salary + " " + employee.raiseEligible + " " + employee.wfh)
  }
  console.log("problem 2");
  console.log("company JSON: " + company);
  console.log("problem 3");
  console.log("New employee: " + employees[3]);
  console.log("problem 4");
  console.log("total salary: " + totalSalary);
  console.log("problem 5");
  const problem5 = isEligible(company);
  console.log("Raise: " + problem5);
  console.log("problem 6")
  console.log("Sam working from home? " + employees[0].wfh + " "+ "| " +
    "Anna working from home?: " +  employees[3].wfh);