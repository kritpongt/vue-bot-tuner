import { type IPart } from '@/models/Part'

export class PartRow{
	constructor(
		private readonly _id: number,
		public type: string,
		public partName: string,
		public quantity: number,
		public part: IPart | null = null
	){}

	get id(){
		return this._id
	}
}
