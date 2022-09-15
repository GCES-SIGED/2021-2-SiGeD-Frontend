import axios from 'axios';
import { BaseUrlRoles } from '../../../Constants/baseUrl'

export const APIRole = axios.create({
  baseURL: BaseUrlRoles,
});