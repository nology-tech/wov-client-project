import { useState } from "react";

import "./CompletedTask.scss";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type CompletedTaskProps = {
  taskHeading: string;
  category: string;
  points: number;
  description: string;
  image: string;
};

const CompletedTask = ({
  taskHeading,
  category,
  points,
  description,
  image,
}: CompletedTaskProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="completed-task">
      <CardHeader
        className="completed-task__header"
        action={
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
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

          <Typography variant="h4" className="completed-task__media">
            Media
          </Typography>
          <div className="completed-task__img">
            <CardMedia component="img" image={image} alt={taskHeading} />
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CompletedTask;
