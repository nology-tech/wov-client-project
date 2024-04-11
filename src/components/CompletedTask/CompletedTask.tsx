import { useState } from "react";

import "./CompletedTask.scss";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  CardMedia,
  Collapse,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type CompletedTaskProps = {
  taskHeading: string;
  category: string;
  points: number;
  description: string;
  image?: string;
};

const CompletedTask = ({
  taskHeading,
  category,
  points,
  description,
  image,
}: CompletedTaskProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const expandIconClass = expanded ? "arrow-up" : "arrow-down";

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="completed-task">
      <CardHeader
        className="completed-task__header"
        action={
          <ExpandMoreIcon
            className={expandIconClass}
            onClick={handleExpandClick}
          />
        }
        disableTypography={true}
        title={
          <Typography variant="h3" className="completed-task__heading">
            {taskHeading}
          </Typography>
        }
        subheader={
          <div>
            <Typography variant="body1" className="completed-task__category">
              {category}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              className="completed-task__points"
            >
              {`${points} points`}
            </Typography>
          </div>
        }
      />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph className="completed-task__description">
            {description}
          </Typography>

          {image && (
            <div>
              <Typography variant="h4" className="completed-task__media">
                Media
              </Typography>
              <div className="completed-task__img">
                <CardMedia component="img" image={image} alt={taskHeading} />
              </div>
            </div>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CompletedTask;
