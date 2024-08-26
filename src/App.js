import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Components/HRM_System_setup/Branch/Branch';
import Dashboard from './Components/Dashboard/Dashboard';
import Sidebar from './Components/Sidebar/Sidebar';
import home from './Components/home';
import { Table } from './Components/Table/Table';
import Roles from './Components/Staff/Role/Roles';
import { Await, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Branch_view from './Components/HRM_System_setup/Branch/Branch_view';
import Branch_edit from './Components/HRM_System_setup/Branch/Branch_edit2';
import Department from './Components/HRM_System_setup/Department/Department_Edit';
import Department_view from './Components/HRM_System_setup/Department/Department_view';
import Department_Edit from './Components/HRM_System_setup/Department/Department_Edit';
import DesignationView from './Components/HRM_System_setup/Designation/Designation';
import Designation_Edit from './Components/HRM_System_setup/Designation/Designation_edit';
import Leaves from './Components/HRM_System_setup/Leaves/Leaves';
import Leave_Edit from './Components/HRM_System_setup/Leaves/Leave_edit';
import Document_type from './Components/HRM_System_setup/Document_type/Document_type';
import Document_type_Edit from './Components/HRM_System_setup/Document_type/Document_type_edit';
import Payslip_type_create from './Components/HRM_System_setup/Payslip/Payslip';
import Payslip_type_Edit from './Components/HRM_System_setup/Payslip/Payslip_edit';
import Allowance_option_create from './Components/HRM_System_setup/Allowance_option/Allowance_option';
import Allowance_option_Edit from './Components/HRM_System_setup/Allowance_option/Allowance_option_edit';
import Loan_option_create from './Components/Loan_option/Loan_option';
import Loan_option_Edit from './Components/Loan_option/Loan_option_edit';
import Deduction_option_create from './Components/HRM_System_setup/Deduction_option/Deduction_option';
import Deduction_option_Edit from './Components/HRM_System_setup/Deduction_option/Deduction_option_edit';
import Goal_type_create from './Components/HRM_System_setup/Goal_Type/Goal_type';
import Goal_type_Edit from './Components/HRM_System_setup/Goal_Type/Goal_type_edit';
import Training_type_create from './Components/HRM_System_setup/Training_type/Training_type';
import Training_type_Edit from './Components/HRM_System_setup/Training_type/Training_type_edit';
import Award_type_create from './Components/HRM_System_setup/Award_type/Award_type';
import Award_type_Edit from './Components/HRM_System_setup/Award_type/Award_type_ediyt';
import Termination_type_create from './Components/HRM_System_setup/Termination_type/Termination_type';
import Termination_type_Edit from './Components/HRM_System_setup/Termination_type/Termination_type_edit';
import Job_category_create from './Components/HRM_System_setup/Job_category/Job_category';
import Job_category_Edit from './Components/HRM_System_setup/Job_category/Job_category_edit';
import Job_stage_create from './Components/HRM_System_setup/Job_stage/Job_stage';
import Job_stage_Edit from './Components/HRM_System_setup/Job_stage/Job_stage_edit';
import Performance_type_create from './Components/HRM_System_setup/Performance_type/Performance_type';
import Performance_type_Edit from './Components/HRM_System_setup/Performance_type/Performance_type_edit';
import Competencies_create from './Components/HRM_System_setup/Competencies/Competencies';
import Competencies_Edit from './Components/HRM_System_setup/Competencies/Competencies_edit';
import Expence_type_create from './Components/HRM_System_setup/Expense_type/Expence_type';
import Expence_type_Edit from './Components/HRM_System_setup/Expense_type/Expence_type_edit';
import Income_type_create from './Components/HRM_System_setup/Income_type/Income_type';
import Income_type_Edit from './Components/HRM_System_setup/Income_type/Income_type_edit';
import Payment_type_create from './Components/HRM_System_setup/Payment_type/Payment_type';
import Payment_type_Edit from './Components/HRM_System_setup/Payment_type/Payment_type_edit';
import Contract_type_create from './Components/HRM_System_setup/Contract_type/Contract_type';
import Contract_type_Edit from './Components/HRM_System_setup/Contract_type/Contract_type_edit';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Register from './Register';
import Dashboardtest from './Components/Dashboard/Dashboardtest';
import Employee_Dashboard from './Components/Employee_Dashboard/Employee_Dashboard';
import Hr_Dashboard from './Components/Hr_dashboard/Hr_dashboard';
import Manager_dashboard from './Components/Manager_dashboard/Manager_dashboard';
import RoleEditForm from './Components/Staff/Role/Roles_edit';
import CreatePolicyForm from './Components/Company_Policy/CompanyPolicy';
import EditPolicyForm from './Components/Company_Policy/CompanyPolicy-edit';
import Assets_create from './Components/Assets/Assets';
import Assets_Edit from './Components/Assets/Assets-edit';
import Zoom_create from './Components/Zoom/Zoom';
import Zoom_Edit from './Components/Zoom/Zoom-edit';
import Meeting_create from './Components/Meeting/Meetings';
import Meeting_Edit from './Components/Meeting/Meeting_edit';
import Event_create from './Components/Events/Event';
import Event_Edit from './Components/Events/Event_edit';
import Ticket_create from './Components/Ticket/Tickets';
import Ticket_Edit from './Components/Ticket/Tickets_edit';
import Contract_create from './Components/Contract/Contracts';
import Contract_Edit from './Components/Contract/Contracts-edit';
import Interview_schedule_create from './Components/Recruitment/Interview_schedule/Interview_schedules';
import Interview_schedule_Edit from './Components/Recruitment/Interview_schedule/Interview_schedules_edit';
import Job_On_Boarding_create from './Components/Recruitment/job-on-boarding/job-on-boardings';
import Job_On_Boarding_Edit from './Components/Recruitment/job-on-boarding/job-on-boarding-edit';
import Job_Application_create from './Components/Recruitment/Job_Application/Job_Application';
import Job_Application_Edit from './Components/Recruitment/Job_Application/Job_Application_edit';
import Job_create from './Components/Recruitment/Job/Jobs';
import Job_Edit from './Components/Recruitment/Job/Jobs_edit';
import Holiday_create from './Components/HR_Admin_setup/Holiday/Holiday';
import Holiday_Edit from './Components/HR_Admin_setup/Holiday/Holiday_edit';
import Announcement_create from './Components/HR_Admin_setup/Announcement/Announcements';
import Announcement_Edit from './Components/HR_Admin_setup/Announcement/Announcement-edit';
import Termination_create from './Components/HR_Admin_setup/Termination/Terminations';
import Termination_Edit from './Components/HR_Admin_setup/Termination/Terminations-edit';
import Warning_Edit from './Components/HR_Admin_setup/Warning/Warning_edit';
import Warning_create from './Components/HR_Admin_setup/Warning/Warnings';
import Complaint_create from './Components/HR_Admin_setup/Complaint/Complaints';
import Complaint_Edit from './Components/HR_Admin_setup/Complaint/Complaints_edit';
import Promotion_create from './Components/HR_Admin_setup/Promotion/Promotions';
import Promotion_Edit from './Components/HR_Admin_setup/Promotion/Promotions-edit';
import Trip_create from './Components/HR_Admin_setup/Trip/Trips';
import Trip_Edit from './Components/HR_Admin_setup/Trip/Trip_edit';
import Resignation_create from './Components/HR_Admin_setup/Resignation/Resignations';
import Resignation_Edit from './Components/HR_Admin_setup/Resignation/Resignations_edit';
import Transfer_create from './Components/HR_Admin_setup/Transfer/Transfers';
import Transfer_Edit from './Components/HR_Admin_setup/Transfer/Transfers-edit';
import Award_Edit from './Components/HR_Admin_setup/Award/Award_edit';
import Award_create from './Components/HR_Admin_setup/Award/Awards';
import Training_create from './Components/Training/Training_list/Trainings';
import Training_Edit from './Components/Training/Training_list/Trainings_edit';
import Trainer_create from './Components/Training/Trainer/Trainers';
import Trainer_Edit from './Components/Training/Trainer/Trainers-edit';
import Transfer_balance_create from './Components/Finance/Transfer_balance/Transfer_balances';
import Transfer_balance_Edit from './Components/Finance/Transfer_balance/Transfer_balances-edit';
import Expense_create from './Components/Finance/Expence/Expenses';
import Expense_Edit from './Components/Finance/Expence/Expenses_edit';
import Deposit_create from './Components/Finance/Deposit/Deposits';
import Deposit_Edit from './Components/Finance/Deposit/Deposit_edit';
import Payer_create from './Components/Finance/Payer/Payers';
import Payer_Edit from './Components/Finance/Payer/Payers-edit';
import Payee_create from './Components/Finance/Payee/Payees';
import Payee_Edit from './Components/Finance/Payee/Payees-edit';
import Account_create from './Components/Finance/Account/Accounts';
import Account_Edit from './Components/Finance/Account/Account_edit';
import Goal_tracking_create from './Components/Performance/Goal_tracking/Goal_trackings';
import Goal_tracking_Edit from './Components/Performance/Goal_tracking/Goal_trackings-edit';
import Appraisal_create from './Components/Performance/Appraisal/Appraisals';
import Appraisal_Edit from './Components/Performance/Appraisal/Appraisals-edit';
import Indicator_create from './Components/Performance/Indicator/Indicators';
import Indicator_Edit from './Components/Performance/Indicator/Indicators_edit';
import Leaves_create from './Components/Timesheet/Manage_leave/Leaves';
import Leaves_Edit from './Components/Timesheet/Manage_leave/Leaves-edit';
import Timesheet_create from './Components/Timesheet/Timesheet/Timesheets';
import Timesheet_Edit from './Components/Timesheet/Timesheet/Timesheet-edit';
import CreateEmployee from './Components/Employee/Employees';
import EditEmployee from './Components/Employee/Employee_edit';
import Attendance_view from './Components/Timesheet/Attendance/Attendance_view';

const CurrRole = localStorage.getItem('Curr_User');
const router = createBrowserRouter([
  {
    path: '/reg',
    element: <><Register /></>,
  },
    {
    path: '/login',
    element: <><Login /></>,
  },
  {
    path: '/',
    element: <><PrivateRoute><Sidebar />{CurrRole === 'admin' ? <Manager_dashboard />:CurrRole === 'Hr' ? <Hr_Dashboard />:CurrRole === 'manager' ? <Manager_dashboard />: <Employee_Dashboard />}</PrivateRoute></>,
  },
  {
    path: '/dashboard',
    element: <><Sidebar /><Dashboardtest /></>,
  },
  {
    path: '/emp-dashboard',
    element: <><Sidebar /><Employee_Dashboard /></>,
  },
  {
    path: '/hr-dashboard',
    element: <><Sidebar /><Hr_Dashboard /></>,
  },
  {
    path: '/manager-dashboard',
    element: <><Sidebar /><Manager_dashboard /></>,
  },
  {
    path: '/roles',
    element: <><Sidebar /><Roles /></>,
  },
  {
    path: '/edit-role/:roleId',
    element: <><Sidebar /><RoleEditForm /></>,
  },
  {
    path: '/employee',
    element: <><Sidebar /><CreateEmployee /></>,
  },
  {
    path: '/edit-employees/:employeeId',
    element: <><Sidebar /><EditEmployee /></>,
  },
  {
    path: '/attendance',
    element: <><Sidebar /><Attendance_view /></>,

  },
  
  {
    path: '/branchs',
    element: <><Sidebar /><Branch_view /></>,
  },
  {
    path: '/edit-branch/:branchId',
    element: <><Sidebar /><Branch_edit /></>,
  },
  {
    path: '/departments',
    element: <><Sidebar /><Department_view /></>,
  },
   {
    path: '/edit-department/:departmentId',
    element: <><Sidebar /><Department_Edit /></>,
  },
   {
    path: '/designation',
    element: <><Sidebar /><DesignationView /></>,
  },
   {
    path: '/edit-designation/:designationId',
    element: <><Sidebar /><Designation_Edit /></>,
  },
  {
    path: '/leave',
    element: <><Sidebar /><Leaves /></>,
  },
  {
    path: '/edit-leave/:leaveId',
    element: <><Sidebar /><Leave_Edit /></>,
  },
  {
    path: '/document-type',
    element: <><Sidebar /><Document_type /></>,
  },
  {
    path: '/edit-document-type/:Document_typeId',
    element: <><Sidebar /><Document_type_Edit /></>,
  },
   {
    path: '/payslip-type',
    element: <><Sidebar /><Payslip_type_create /></>,
  },
  {
    path: '/edit-payslip-type/:Payslip_typeId',
    element: <><Sidebar /><Payslip_type_Edit /></>,
  },
   {
    path: '/allowance_option',
    element: <><Sidebar /><Allowance_option_create /></>,
  },
  {
    path: '/edit-allowance_option/:Allowance_optionId',
    element: <><Sidebar /><Allowance_option_Edit /></>,
  },
   {
    path: '/loan_option',
    element: <><Sidebar /><Loan_option_create /></>,
  },
  {
    path: '/edit-loan_option/:Loan_optionId',
    element: <><Sidebar /><Loan_option_Edit /></>,
  },
   {
    path: '/deduction_option',
    element: <><Sidebar /><Deduction_option_create /></>,
  },
  {
    path: '/edit-deduction_option/:Deduction_optionId',
    element: <><Sidebar /><Deduction_option_Edit /></>,
  },
  {
    path: '/goal_type',
    element: <><Sidebar /><Goal_type_create /></>,
  },
   {
    path: '/edit-goal_type/:Goal_typeId',
    element: <><Sidebar /><Goal_type_Edit /></>,
  },
   {
    path: '/training_type',
    element: <><Sidebar /><Training_type_create /></>,
  },
  {
    path: '/edit-training_type/:Training_typeId',
    element: <><Sidebar /><Training_type_Edit /></>,
  },
   {
    path: '/award_type',
    element: <><Sidebar /><Award_type_create /></>,
  },
  {
    path: '/edit-award_type/:Award_typeId',
    element: <><Sidebar /><Award_type_Edit /></>,
  },
   {
    path: '/termination_type',
    element: <><Sidebar /><Termination_type_create /></>,
  },
  {
    path: '/edit-termination_type/:Termination_typeId',
    element: <><Sidebar /><Termination_type_Edit /></>,
  },
   {
    path: '/job_category',
    element: <><Sidebar /><Job_category_create /></>,
  },
  {
    path: '/edit-job_category/:Job_categoryId',
    element: <><Sidebar /><Job_category_Edit /></>,
  },
   {
    path: '/job_stage',
    element: <><Sidebar /><Job_stage_create /></>,
  },
  {
    path: '/edit-job_stage/:Job_stageId',
    element: <><Sidebar /><Job_stage_Edit /></>,
  },
   {
    path: '/performance_type',
    element: <><Sidebar /><Performance_type_create /></>,
  },
  {
    path: '/edit-performance_type/:Performance_typeId',
    element: <><Sidebar /><Performance_type_Edit /></>,
  },
   {
    path: '/competencies',
    element: <><Sidebar /><Competencies_create /></>,
  },
  {
    path: '/edit-competencies/:CompetenciesId',
    element: <><Sidebar /><Competencies_Edit /></>,
  },
   {
    path: '/expence_type',
    element: <><Sidebar /><Expence_type_create /></>,
  },
  {
    path: '/edit-expence_type/:Expence_typeId',
    element: <><Sidebar /><Expence_type_Edit /></>,
  },
   {
    path: '/income_type',
    element: <><Sidebar /><Income_type_create /></>,
  },
  {
    path: '/edit-income_type/:Income_typeId',
    element: <><Sidebar /><Income_type_Edit /></>,
  },
   {
    path: '/payment_type',
    element: <><Sidebar /><Payment_type_create /></>,
  },
  {
    path: '/edit-payment_type/:Payment_typeId',
    element: <><Sidebar /><Payment_type_Edit /></>,
  },
   {
    path: '/contract_type',
    element: <><Sidebar /><Contract_type_create /></>,
  },
  {
    path: '/edit-contract_type/:Contract_typeId',
    element: <><Sidebar /><Contract_type_Edit/></>,
  },

  {
    path: '/timesheet',
    element: <><Sidebar /><Timesheet_create/></>,
  },
  {
    path: '/edit-timesheet/:timesheetId',
    element: <><Sidebar /><Timesheet_Edit/></>,
  },
  {
    path: '/Leaves',
    element: <><Sidebar /><Leaves_create/></>,
  },
  {
    path: '/edit-Leaves/:LeavesId',
    element: <><Sidebar /><Leaves_Edit/></>,
  },
  {
    path: '/Indicator',
    element: <><Sidebar /><Indicator_create/></>,
  },
  {
    path: '/edit-Indicator/:IndicatorId',
    element: <><Sidebar /><Indicator_Edit/></>,
  },
  {
    path: '/Appraisal',
    element: <><Sidebar /><Appraisal_create/></>,
  },
  {
    path: '/edit-Appraisal/:AppraisalId',
    element: <><Sidebar /><Appraisal_Edit/></>,
  },
  {
    path: '/Goal_tracking',
    element: <><Sidebar /><Goal_tracking_create/></>,
  },
  {
    path: '/edit-Goal_tracking/:Goal_trackingId',
    element: <><Sidebar /><Goal_tracking_Edit/></>,
  },
  {
    path: '/Account',
    element: <><Sidebar /><Account_create/></>,
  },
  {
    path: '/edit-Account/:AccountId',
    element: <><Sidebar /><Account_Edit/></>,
  },
  {
    path: '/Payee',
    element: <><Sidebar /><Payee_create/></>,
  },
  {
    path: '/edit-Payee/:PayeeId',
    element: <><Sidebar /><Payee_Edit/></>,
  },
  {
    path: '/Payer',
    element: <><Sidebar /><Payer_create/></>,
  },
  {
    path: '/edit-Payer/:PayerId',
    element: <><Sidebar /><Payer_Edit/></>,
  },
  {
    path: '/Deposit',
    element: <><Sidebar /><Deposit_create/></>,
  },
  {
    path: '/edit-Deposit/:DepositId',
    element: <><Sidebar /><Deposit_Edit/></>,
  },
  {
    path: '/Expense',
    element: <><Sidebar /><Expense_create/></>,
  },
  {
    path: '/edit-Expense/:ExpenseId',
    element: <><Sidebar /><Expense_Edit/></>,
  },
  {
    path: '/Transfer_balance',
    element: <><Sidebar /><Transfer_balance_create/></>,
  },
  {
    path: '/edit-Transfer_balance/:Transfer_balanceId',
    element: <><Sidebar /><Transfer_balance_Edit/></>,
  },
  {
    path: '/Training',
    element: <><Sidebar /><Training_create/></>,
  },
  {
    path: '/edit-Training/:TrainingId',
    element: <><Sidebar /><Training_Edit/></>,
  },
  {
    path: '/Trainer',
    element: <><Sidebar /><Trainer_create/></>,
  },
  {
    path: '/edit-Trainer/:TrainerId',
    element: <><Sidebar /><Trainer_Edit/></>,
  },
  {
    path: '/Award',
    element: <><Sidebar /><Award_create/></>,
  },
  {
    path: '/edit-Award/:AwardId',
    element: <><Sidebar /><Award_Edit/></>,
  },
  {
    path: '/Transfer',
    element: <><Sidebar /><Transfer_create/></>,
  },
  {
    path: '/edit-Transfer/:TransferId',
    element: <><Sidebar /><Transfer_Edit/></>,
  },
  {
    path: '/Resignation',
    element: <><Sidebar /><Resignation_create/></>,
  },
  {
    path: '/edit-Resignation/:ResignationId',
    element: <><Sidebar /><Resignation_Edit/></>,
  },
  {
    path: '/Trip',
    element: <><Sidebar /><Trip_create/></>,
  },
  {
    path: '/edit-Trip/:TripId',
    element: <><Sidebar /><Trip_Edit/></>,
  },
  {
    path: '/Promotion',
    element: <><Sidebar /><Promotion_create/></>,
  },
  {
    path: '/edit-Promotion/:PromotionId',
    element: <><Sidebar /><Promotion_Edit/></>,
  },
  {
    path: '/Complaint',
    element: <><Sidebar /><Complaint_create/></>,
  },
  {
    path: '/edit-Complaint/:ComplaintId',
    element: <><Sidebar /><Complaint_Edit/></>,
  },
  {
    path: '/Warning',
    element: <><Sidebar /><Warning_create/></>,
  },
  {
    path: '/edit-Warning/:WarningId',
    element: <><Sidebar /><Warning_Edit/></>,
  },
  {
    path: '/Termination',
    element: <><Sidebar /><Termination_create/></>,
  },
  {
    path: '/edit-Termination/:TerminationId',
    element: <><Sidebar /><Termination_Edit/></>,
  },

  {
    path: '/Announcement',
    element: <><Sidebar /><Announcement_create/></>,
  },
  {
    path: '/edit-Announcement/:AnnouncementId',
    element: <><Sidebar /><Announcement_Edit/></>,
  },
  {
    path: '/Holiday',
    element: <><Sidebar /><Holiday_create/></>,
  },
  {
    path: '/edit-Holiday/:HolidayId',
    element: <><Sidebar /><Holiday_Edit/></>,
  },
  {
    path: '/Job',
    element: <><Sidebar /><Job_create/></>,
  },
  {
    path: '/edit-Job/:JobId',
    element: <><Sidebar /><Job_Edit/></>,
  },
  {
    path: '/Job_Application',
    element: <><Sidebar /><Job_Application_create/></>,
  },
  {
    path: '/edit-Job_Application/:Job_ApplicationId',
    element: <><Sidebar /><Job_Application_Edit/></>,
  },
  {
    path: '/Job_On_Boarding',
    element: <><Sidebar /><Job_On_Boarding_create/></>,
  },
  {
    path: '/edit-Job_On_Boarding/:Job_On_BoardingId',
    element: <><Sidebar /><Job_On_Boarding_Edit/></>,
  },
  {
    path: '/Interview_schedule',
    element: <><Sidebar /><Interview_schedule_create/></>,
  },
  {
    path: '/edit-Interview_schedule/:Interview_scheduleId',
    element: <><Sidebar /><Interview_schedule_Edit/></>,
  },
  {
    path: '/contract',
    element: <><Sidebar /><Contract_create/></>,
  },
  {
    path: '/edit-Contract/:ContractId',
    element: <><Sidebar /><Contract_Edit/></>,
  },
  {
    path: '/ticket',
    element: <><Sidebar /><Ticket_create/></>,
  },
  {
    path: '/edit-Ticket/:TicketId',
    element: <><Sidebar /><Ticket_Edit/></>,
  },
  {
    path: '/event',
    element: <><Sidebar /><Event_create/></>,
  },
  {
    path: '/edit-Event/:EventId',
    element: <><Sidebar /><Event_Edit/></>,
  },
  {
    path: '/meeting',
    element: <><Sidebar /><Meeting_create/></>,
  },
  {
    path: '/edit-Meeting/:MeetingId',
    element: <><Sidebar /><Meeting_Edit/></>,
  },
  {
    path: '/zoom',
    element: <><Sidebar /><Zoom_create/></>,
  },
  
  {
    path: '/edit-Zoom/:ZoomId',
    element: <><Sidebar /><Zoom_Edit/></>,
  },
  {
    path: '/assets',
    element: <><Sidebar /><Assets_create/></>,
  },
  
  {
    path: '/edit-Assets/:AssetsId',
    element: <><Sidebar /><Assets_Edit/></>,
  },
  
  {
    path: '/policy',
    element: <><Sidebar /><CreatePolicyForm/></>,
  },
  {
    path: '/edit-policy/:policiesId',
    element: <><Sidebar /><EditPolicyForm/></>,
  },

]);

function App() {

  return (
    <div className="App">
      
      <RouterProvider router={router} />
      {/* <div className="main">
        <Dashboard />
      </div> */}
    </div>
  );
}

export default App;
