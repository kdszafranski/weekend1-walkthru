$(document).ready(function() {
    var empArray = [];
    var salaryTotal = 0.00;
    $('#empFirstName').focus();


    $('#employeeinfo').on('submit', function(event) {
      event.preventDefault();
      var values = {};
      var thisEmpSalary = 0.00;

      $.each($('#employeeinfo').serializeArray(), function(i, field) {
        values[field.name] = field.value;
      })

      thisEmpSalary = parseInt(values.empSalary);
      salaryTotal += Math.round(thisEmpSalary / 12);
      values.empSalary = Math.round(thisEmpSalary);

      // clear out inputs
      $('#employeeinfo').find('input[type=text]').val('');
      $('#employeeinfo').find('input[type=number]').val('');
      $('#empFirstName').focus();

      // add to list
      empArray.push(values);
      // console.log(empArray);

      // update salary
      updateSalary(salaryTotal);

      // append to DOM
      appendDom(values);
    });

    // Remove employee when clicked
    $('#container').on('click', '.removeEmployee', function() {
      var index = $(this).data().id;
      var employee = empArray[index];
      console.log('This Employee: ', employee);

      // update Salary with this person's info
      salaryTotal -= Math.round(employee.empSalary / 12);
      updateSalary(salaryTotal);

      // remove from DOM
      $(this).parent().remove();
    });

    function updateSalary(total) {
      $('#salaryAmount').text('$ ' + total);
    }

    function appendDom(empInfo) {
      $('#container').append('<div class="person"></div>');
      var $el = $('#container').children().last();

      $el.append('<h3>' + empInfo.empFirstName + ' ' + empInfo.empLastName + '</h3>');
      $el.append('<p>' + empInfo.empIDNumber + '</p>');
      $el.append('<p>' + empInfo.empJobTitle + '</p>');
      $el.append('<p>$' + empInfo.empSalary + '</p>');
      $el.append('<button data-id="' + (empArray.length - 1) + '" class="removeEmployee">Remove Me!</button>');
    }


});
