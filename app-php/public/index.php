<?php
require_once __DIR__ . '/../models/Cliente.php';
require_once __DIR__ . '/../controllers/ClienteController.php';

$ctrl = new ClienteController();
$action = $_REQUEST['action'] ?? 'list';
switch ($action) {
    case 'create': $ctrl->create(); break;
    case 'edit':   $ctrl->edit();   break;
    case 'save':   $ctrl->save();   break;
    case 'delete': $ctrl->delete(); break;
    default:       $ctrl->index();  break;
}
