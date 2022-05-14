import { Request, Response } from "express";

export default interface ExternalAdapterInterface {
  handleNodeRequest(req: Request, res: Response): Promise<void>;
}
