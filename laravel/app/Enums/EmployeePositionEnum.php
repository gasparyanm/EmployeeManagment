<?php

namespace App\Enums;

interface EmployeePositionEnum
{
    public const ADMINISTRATIVE_ASSISTANT = 'Administrative Assistant';
    public const EXECUTIVE_ASSISTANT = 'Executive Assistant';
    public const MARKETING_MANAGER = 'Marketing Manager';
    public const CUSTOMER_SERVICE_REPRESENTATIVE = 'Customer Service Representative';
    public const NURSE_PRACTITIONER = 'Nurse Practitioner';
    public const SOFTWARE_ENGINEER = 'Software Engineer';
    public const SALES_MANAGER = 'Sales Manager';
    public const DATA_ENTRY_CLERK = 'Data Entry Clerk';
    public const OFFICE_ASSISTANT = 'Office Assistant';

    public const POSITIONS = [
        self::ADMINISTRATIVE_ASSISTANT,
        self::EXECUTIVE_ASSISTANT,
        self::MARKETING_MANAGER,
        self::CUSTOMER_SERVICE_REPRESENTATIVE,
        self::NURSE_PRACTITIONER,
        self::SOFTWARE_ENGINEER,
        self::SALES_MANAGER,
        self::DATA_ENTRY_CLERK,
        self::OFFICE_ASSISTANT,
    ];
}
