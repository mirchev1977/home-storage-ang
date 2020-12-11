import { CoordsModel } from './coords.model';
export class ContainerModel {
  constructor ( 
    public id:          string,
    public imgLink:     string,
    public description: string,
    public items:       string,
    public privacy:     string,
    public vertical:    string,
    public url:         string, 
    public creator:     string,
    public location:    number,
    public coords:      CoordsModel
  ) {}
}
