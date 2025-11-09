-- Add columns to quiz_responses table to store personalized plan data
ALTER TABLE public.quiz_responses
ADD COLUMN IF NOT EXISTS calories INTEGER,
ADD COLUMN IF NOT EXISTS protein INTEGER,
ADD COLUMN IF NOT EXISTS carbs INTEGER,
ADD COLUMN IF NOT EXISTS fats INTEGER,
ADD COLUMN IF NOT EXISTS health_score INTEGER,
ADD COLUMN IF NOT EXISTS target_date DATE,
ADD COLUMN IF NOT EXISTS weight_change NUMERIC(5,2);

-- Add comment to document the columns
COMMENT ON COLUMN public.quiz_responses.calories IS 'Daily recommended calories';
COMMENT ON COLUMN public.quiz_responses.protein IS 'Daily recommended protein in grams';
COMMENT ON COLUMN public.quiz_responses.carbs IS 'Daily recommended carbs in grams';
COMMENT ON COLUMN public.quiz_responses.fats IS 'Daily recommended fats in grams';
COMMENT ON COLUMN public.quiz_responses.health_score IS 'User health score out of 10';
COMMENT ON COLUMN public.quiz_responses.target_date IS 'Target date for weight goal (90 days from plan creation)';
COMMENT ON COLUMN public.quiz_responses.weight_change IS 'Expected weight change in kg (positive for gain, negative for loss)';
