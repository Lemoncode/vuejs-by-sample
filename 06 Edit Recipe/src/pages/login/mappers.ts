import * as model from '../../rest-api/model';
import * as vm from './viewModel';

export const mapLoginEntityVmToModel = (loginEntity: vm.LoginEntity): model.LoginEntity => ({
  ...loginEntity,
});
